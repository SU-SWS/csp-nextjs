"use client"

import useOutsideClick from "@hooks/useOutsideClick"
import {ChevronDownIcon, MagnifyingGlassIcon} from "@heroicons/react/20/solid"
import {useBoolean, useEventListener, useScrollLock, useWindowSize} from "usehooks-ts"
import {RefObject, useEffect, useId, useRef} from "react"
import {usePathname} from "next/navigation"
import cn from "@lib/utils/className"
import Link from "@components/elements/link"
import Button from "@components/elements/button"
import SiteSearchForm from "@components/search/site-search-form"
import {MenuItem as MenuItemType} from "@lib/gql/__generated__/graphql"
import Hamburger from "@components/menu/hamburger"
import ReactFocusLock from "react-focus-lock"
import {XMarkIcon} from "@heroicons/react/24/solid"

type Props = {
  hideSearch?: boolean
  menuItems: MenuItemType[]
}

const MainMenuClient = ({hideSearch, menuItems}: Props) => {
  const {width = 0} = useWindowSize({initializeWithValue: false})
  const {lock: lockScroll, unlock: unlockScroll} = useScrollLock({autoLock: false})
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const {value: menuOpen, setTrue: openMenu, setFalse: closeMenu} = useBoolean(false)
  const browserUrl = usePathname()
  const id = useId()
  const urlRef = useRef(browserUrl)

  useEffect(() => {
    if (browserUrl !== urlRef.current) {
      urlRef.current = browserUrl
      unlockScroll()
      closeMenu()
    }
  }, [browserUrl, closeMenu, unlockScroll])

  const handleClose = () => {
    closeMenu()
    unlockScroll()
    setTimeout(() => buttonRef.current?.focus(), 100)
  }

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key !== "Escape" || !menuOpen) return
    handleClose()
  }
  useEventListener("keydown", handleEscape, menuRef as RefObject<HTMLDivElement>)

  const isMobile = width < 992
  return (
    <nav id={id} aria-label="Main Navigation" className="lg:centered" ref={menuRef}>
      <Hamburger
        ref={buttonRef}
        className="group absolute top-[7.3rem] right-25 z-10 flex flex-row-reverse items-center sm:top-[2.7rem] md:top-[3.9rem] md:right-[6rem] lg:hidden"
        onClick={() => {
          openMenu()
          lockScroll()
        }}
        open={menuOpen}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close Main Navigation Menu" : "Open Main Navigation Menu"}
        aria-controls={`${id}-dialog`}
      >
        <span
          className="mr-10 text-17 text-archway-light group-hocus-visible:underline sm:mt-[.4rem] md:mt-1.25"
          aria-hidden="true"
        >
          {menuOpen ? "Close" : "Menu"}
        </span>
      </Hamburger>
      <ReactFocusLock
        as={isMobile ? "dialog" : "div"}
        autoFocus={isMobile}
        returnFocus
        disabled={!menuOpen || isMobile}
        lockProps={{
          id: `${id}-dialog`,
          open: isMobile,
          "aria-labelledby": isMobile ? id : undefined,
          "aria-modal": isMobile,
        }}
        className={cn(
          "fixed top-0 left-0 z-20 hidden h-dvh w-dvw overflow-auto bg-black lg:relative lg:top-0 lg:block lg:h-auto lg:w-auto lg:overflow-visible lg:bg-transparent",
          {
            block: menuOpen,
          }
        )}
      >
        <button
          onClick={handleClose}
          className="mt-10 mr-10 ml-auto block rounded-full border-2 border-transparent p-3 transition-colors lg:hidden hocus-visible:border-digital-red"
        >
          <XMarkIcon width={30} className="text-white" />
          <span className="sr-only">Close Menu Dialog</span>
        </button>

        {!hideSearch && <SiteSearchForm className="px-20 lg:hidden" />}
        {/* mb-22.5 and lg:justify-start are design changes from CSP-48--menu */}
        <ul className="list-unstyled mb-22.5 flex-wrap p-0 lg:flex lg:justify-start">
          {menuItems.map(item => (
            <MenuItem key={item.id} {...item} level={0} />
          ))}
          <li>
            <Button
              href="/search"
              type="submit"
              showIcon={false}
              variant="search"
              size="round"
              className="relative top-5 hidden lg:block lg:justify-self-end"
            >
              <MagnifyingGlassIcon width={20} />
              <span className="sr-only">Submit Search</span>
            </Button>
          </li>
        </ul>
      </ReactFocusLock>
    </nav>
  )
}

type MenuItemProps = MenuItemType & {
  level: number
}

const MenuItem = ({id, url, title, children, level}: MenuItemProps) => {
  const menuItemRef = useRef<HTMLLIElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const {value: submenuOpen, setFalse: closeSubmenu, toggle: toggleSubmenu} = useBoolean(false)
  const browserUrl = usePathname()
  const href = url || "#"
  const isCurrent = href === browserUrl

  useOutsideClick(menuItemRef, closeSubmenu)

  // Close the submenu if the url changes.
  useEffect(() => closeSubmenu(), [browserUrl, closeSubmenu])

  // If the user presses escape on the keyboard, close the submenus.
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key !== "Escape" || !submenuOpen) return

    closeSubmenu()
    if (level === 0) buttonRef.current?.focus()
  }

  useEventListener("keydown", handleEscape, menuItemRef as unknown as RefObject<HTMLDivElement>)

  return (
    <li
      ref={menuItemRef}
      className={cn(
        "relative m-0 grid grid-cols-10 items-center justify-between border-b border-cool-grey py-5 first:border-t last:border-0 lg:relative lg:border-black-20 lg:py-0 lg:pr-27.5",
        {"first:border-t-0 lg:flex lg:border-b-0 last:lg:pr-0": level === 0, "lg:first:border-t-0": level === 1}
      )}
    >
      <Link
        href={href}
        id={id}
        data-intrail={!isCurrent && browserUrl.includes(href) && href !== "/"}
        aria-current={isCurrent ? "page" : undefined}
        className={cn(
          "col-start-1 col-end-9 border-l-[6px] border-transparent py-12.5 text-white no-underline transition-all lg:gap-7.5 lg:text-17 lg:font-normal lg:text-stone-dark lg:active:text-cardinal-red hocus:text-white lg:hocus:text-stone-dark hocus-visible:border-white hocus-visible:underline",
          {
            "ml-12.5 pl-25 lg:ml-0 lg:border-l-0 lg:pb-5 lg:pl-0 aria-current-page:text-white lg:aria-current-page:text-cardinal-red lg:hocus:aria-current-page:text-cardinal-red data-intrail:border-transparent lg:data-intrail:border-fog-dark":
              level === 0,
            "pl-40 lg:pl-20 lg:hocus-visible:border-black-true aria-current-page:border-digital-red": level === 1,
            "pl-56 lg:pl-20 lg:hocus-visible:border-black-true aria-current-page:border-digital-red": level === 2,
            "pl-96 lg:pl-40 lg:hocus-visible:border-black-true aria-current-page:border-digital-red": level === 3,
            "ml-10 lg:ml-0 lg:hocus-visible:border-black-true aria-current-page:border-digital-red": level !== 0,
          }
        )}
      >
        {title}
      </Link>
      {level === 0 && <span className="mb-[6px] ml-12.5 hidden h-[25px] lg:block" />}

      {!!children.length && (
        <>
          <button
            aria-labelledby={id}
            className="group relative right-25 col-start-10 w-fit shrink-0 rounded-full border border-transparent bg-white text-black active:text-black lg:right-0 lg:mt-5 lg:rounded-full lg:border-transparent lg:bg-transparent lg:text-archway-light hocus:bg-white hocus:text-black lg:hocus:bg-transparent lg:hocus:text-archway-light hocus-visible:border-black lg:hocus-visible:border lg:hocus-visible:border-fog-dark lg:aria-current-page:text-cardinal-red"
            ref={buttonRef}
            onClick={toggleSubmenu}
            aria-expanded={submenuOpen}
          >
            <ChevronDownIcon
              height={20}
              className={cn(
                "ml-auto transition duration-150 ease-in-out group-hocus-visible:text-csp-digital-red-xdark",
                {"rotate-180": submenuOpen}
              )}
            />
          </button>

          {submenuOpen && (
            <ul
              className={cn("list-unstyled col-span-10 w-full min-w-300 px-0 lg:bg-white", {
                "lg:absolute lg:top-full lg:left-0 lg:shadow-2xl": level === 0,
                "lg:top-0": level !== 0,
              })}
            >
              {children.map(item => (
                <MenuItem key={item.id} {...item} level={level + 1} />
              ))}
            </ul>
          )}
        </>
      )}
    </li>
  )
}

export default MainMenuClient
