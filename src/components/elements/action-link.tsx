import {HtmlHTMLAttributes} from "react"
import cn from "@lib/utils/className"
import Link from "next/link"
import {getLinkHref} from "@components/elements/link"
import {ChevronRightIcon} from "@heroicons/react/20/solid"

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
        "group relative flex gap-4 pr-10 font-sans text-18 font-normal text-archway-dark no-underline hocus:underline",
        props.className
      )}
    >
      {children}
      <div className="mb-[.3rem] size-[2.6rem] rounded-full border border-csp-digital-red-xdark bg-digital-red hocus:bg-cardinal-red">
        <ChevronRightIcon
          height={25}
          className="inline-block fill-white align-top transition-all group-hocus-visible:translate-x-1"
        />
      </div>
    </Link>
  )
}
export default ActionLink
