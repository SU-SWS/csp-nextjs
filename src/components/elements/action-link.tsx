import {HtmlHTMLAttributes} from "react"
import cn from "@lib/utils/className"
import Link, {LinkProps} from "next/link"
import {getLinkHref} from "@components/elements/link"
import {ChevronRightIcon} from "@heroicons/react/20/solid"

type Props = HtmlHTMLAttributes<HTMLAnchorElement> & {
  /**
   * Link url.
   */
  href: string
  /**
   * Next.js prefetch functionality. Disabled by default.
   */
  prefetch?: LinkProps["prefetch"]
}

const ActionLink = ({href, children, prefetch = false, ...props}: Props) => {
  const isAnchor = href.startsWith("#")
  const Component = isAnchor ? "a" : Link
  return (
    <Component
      {...props}
      {...(!isAnchor && {prefetch})}
      href={getLinkHref(href)}
      className={cn(
        "group relative flex gap-10 pr-25 font-sans text-18 font-normal text-archway-dark no-underline hocus:underline",
        props.className
      )}
    >
      {children}
      <span className="mb-[.3rem] block size-[2.6rem] rounded-full border border-csp-digital-red-dark bg-digital-red hocus:bg-cardinal-red">
        <ChevronRightIcon
          height={25}
          className="inline-block fill-white align-top transition-all group-hocus-visible:translate-x-2.5"
        />
      </span>
    </Component>
  )
}
export default ActionLink
