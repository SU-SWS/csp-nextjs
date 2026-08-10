import {HtmlHTMLAttributes} from "react"
import cn from "@lib/utils/className"
import Link from "next/link"
import {getLinkHref} from "@components/elements/link"

type Props = HtmlHTMLAttributes<HTMLAnchorElement> & {
  /**
   * Link url.
   */
  href: string
}

const ActionLink = ({href, children, ...props}: Props) => {
  return (
    <Link
      {...props}
      href={getLinkHref(href)}
      className={cn(
        "group relative pr-10 font-sans text-18 font-normal text-archway-dark no-underline hocus:underline",
        props.className
      )}
    >
      {children}
    </Link>
  )
}
export default ActionLink
