import {ChevronRightIcon} from "@heroicons/react/20/solid"
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
    <Link {...props} href={getLinkHref(href)} className={cn("group relative flex gap-4 pr-[25px]", props.className)}>
      {children}
      <div className="size-[2.6rem] rounded-full border border-digital-red-dark bg-digital-red hocus:bg-cardinal-red">
        <ChevronRightIcon
          height={25}
          className="inline-block fill-white transition-all group-hocus-visible:translate-x-1"
        />
      </div>
    </Link>
  )
}
export default ActionLink
