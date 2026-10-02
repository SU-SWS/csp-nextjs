"use client"

import Link from "@components/elements/link"
import {BookLink, MenuItem as MenuItemType} from "@lib/gql/__generated__/graphql"
import {HTMLAttributes, RefObject, useEffect, useId, useRef} from "react"
import cn from "@lib/utils/className"
import {useBoolean, useEventListener} from "usehooks-ts"
import {usePathname} from "next/navigation"
import useOutsideClick from "@hooks/useOutsideClick"
import Hamburger from "@components/menu/hamburger"

type Props = HTMLAttributes<HTMLElement> & {
  /**
   * Array of nested menu items.
   */
  menuItems: MenuItemType[] | BookLink[]
  /**
   * The trail of the current page within the menu items.
   */
  activeTrail: string[]
}

const SideNav = ({menuItems, activeTrail, ...props}: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const {value: menuOpen, setFalse: closeMenu, toggle: toggleMenu} = useBoolean(false)
  const browserUrl = usePathname()
  const id = useId()
  useOutsideClick(menuRef, closeMenu)
  useEffect(() => closeMenu(), [browserUrl, closeMenu])

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key !== "Escape" || !menuOpen) return

    closeMenu()
    buttonRef.current?.focus()
  }
  useEventListener("keydown", handleEscape, menuRef as RefObject<HTMLDivElement>)

  return (
    <nav aria-labelledby={`${id}-label`} ref={menuRef} {...props} className={cn("relative mb-50", props.className)}>
      <Hamburger
        ref={buttonRef}
        className="group flex w-full items-center justify-between border border-black-20 p-10 lg:hidden"
        onClick={toggleMenu}
        open={menuOpen}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close Secondary Navigation Menu" : "Open Secondary Navigation Menu"}
        aria-controls={id}
      >
        <span id={`${id}-label`} className="order-first font-semibold group-hocus:underline">
          Section Menu
        </span>
      </Hamburger>

      <div
        id={id}
        className={cn(
          "absolute top-full left-0 z-10 hidden w-full rounded-xl border border-black-20 p-20 shadow-2xl max-lg:bg-white",
          // Fade and slide the panel on mobile. `transition-discrete` keeps `display` in the
          // transition, so the panel still lands on `hidden` -- and out of the tab order -- once the
          // close animation finishes. `starting:` supplies the pre-open style that an element coming
          // out of `display: none` would otherwise not have, which is what makes the open animate.
          "max-lg:-translate-y-8 max-lg:opacity-0 max-lg:transition max-lg:transition-discrete max-lg:duration-300 max-lg:ease-out",
          "max-lg:motion-reduce:transition-none max-lg:starting:-translate-y-8 max-lg:starting:opacity-0",
          {
            "block max-lg:translate-y-0 max-lg:opacity-100": menuOpen,
          },
          // Desktop renders the panel inline and unanimated.
          "lg:relative lg:block lg:border-0 lg:p-0 lg:shadow-none"
        )}
      >
        <ul className="list-unstyled">
          {menuItems.map(item => (
            <MenuItem key={`sidenav--${item.id}`} {...item} activeTrail={activeTrail} level={0} />
          ))}
        </ul>
      </div>
    </nav>
  )
}

type MenuItemProps = (MenuItemType | BookLink) & {
  activeTrail: string[]
  level: number
}

const MenuItem = ({id, url, title, children, activeTrail, level, expanded}: MenuItemProps) => {
  const hasChildren = !!children && children.length > 0
  const isOpen = expanded && hasChildren && activeTrail.includes(id)

  const linkClasses = cn(
    "group relative flex w-full items-center py-12.5 pl-25 font-sans text-17 font-normal no-underline hocus:underline",
    {
      // Non-active state.
      "text-digital-red before:scale-y-[1] before:transition hocus:text-archway-dark hocus:before:absolute hocus:before:top-0 hocus:before:left-0 hocus:before:block hocus:before:h-full hocus:before:w-[6px] hocus:before:bg-archway-dark hocus:before:content-['']":
        activeTrail.at(-1) !== id,
      // Active state.
      "text-archway-dark before:absolute before:top-0 before:left-0 before:block before:h-full before:w-[6px] before:bg-archway-dark before:content-['']":
        activeTrail.at(-1) === id,
    }
  )

  return (
    <li className="m-0 border-b border-fog p-0 last:border-0">
      <Link href={url || "#"} className={linkClasses} aria-current={activeTrail.at(-1) === id ? "page" : undefined}>
        {title}
      </Link>
      {isOpen && (
        <ul
          className={cn("list-unstyled border-t border-fog", {
            "pl-20": level === 0,
            "pl-40": level === 1,
            "pl-56": level === 2,
            "pl-96": level === 3,
          })}
        >
          {children.map(item => (
            <MenuItem key={item.id} {...item} level={level + 1} activeTrail={activeTrail} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default SideNav
