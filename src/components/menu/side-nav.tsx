import Link from "@components/elements/link"
import {BookLink, MenuItem as MenuItemType} from "@lib/gql/__generated__/graphql"
import {HTMLAttributes} from "react"
import {ChevronDownIcon} from "@heroicons/react/20/solid"
import cn from "@lib/utils/className"

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
  return (
    <nav aria-label="Secondary Navigation" {...props}>
      <ul className="list-unstyled mb-20">
        {menuItems.map(item => (
          <MenuItem key={`sidenav--${item.id}`} {...item} activeTrail={activeTrail} level={0} />
        ))}
      </ul>
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
    "group relative flex w-full items-center py-5 pl-10 font-sans text-17 font-normal no-underline hocus:underline",
    {
      // Non-active state.
      "text-digital-red before:scale-y-[1] before:transition hocus:text-archway-dark hocus:before:absolute hocus:before:left-0 hocus:before:top-0 hocus:before:block hocus:before:h-full hocus:before:w-[6px] hocus:before:bg-archway-dark hocus:before:content-['']":
        activeTrail.at(-1) !== id,
      // Active state.
      "text-archway-dark before:absolute before:left-0 before:top-0 before:block before:h-full before:w-[6px] before:bg-archway-dark before:content-['']":
        activeTrail.at(-1) === id,
    }
  )

  return (
    <li className="m-0 border-b border-fog p-0 last:border-0">
      <Link href={url || "#"} className={linkClasses} aria-current={activeTrail.at(-1) === id ? "page" : undefined}>
        {title}
        {hasChildren && (
          <ChevronDownIcon height={20} aria-hidden="true" className="ml-auto shrink-0 text-archway-light" />
        )}
      </Link>
      {isOpen && (
        <ul
          className={cn("list-unstyled border-t border-fog", {
            "pl-10": level === 0,
            "pl-20": level === 1,
            "pl-28": level === 2,
            "pl-48": level === 3,
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
