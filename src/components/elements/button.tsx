import twMerge from "@lib/utils/twMerge"
import {HtmlHTMLAttributes, MouseEventHandler} from "react"
import {Maybe} from "@lib/gql/__generated__/graphql"
import {LinkProps} from "next/dist/client/link"
import Link from "next/link"
import {getLinkHref} from "@components/elements/link"
import {ArrowRightIcon} from "@heroicons/react/20/solid"
import {clsx} from "clsx"

export type ButtonVariantType = "primary" | "secondary" | "ghost" | "digitalred" | "archway" | "search"
export type ButtonSizeType = "default" | "big" | "round"

export type ButtonProps = HtmlHTMLAttributes<HTMLAnchorElement | HTMLButtonElement> & {
  /**
   * Link URL.
   */
  href?: Maybe<string>
  /**
   * If the element should be a <button>, default is <a>.
   */
  buttonElem?: boolean
  /**
   * Visual style variant.
   */
  variant?: ButtonVariantType
  /**
   * Size variant.
   */
  size?: ButtonSizeType
  /**
   * Center the button in the container.
   */
  centered?: boolean
  /**
   * Click handler, mostly when using a button element.
   */
  onClick?: MouseEventHandler
  /**
   * Next.js prefetch functionality.
   */
  prefetch?: LinkProps["prefetch"]
  /**
   * Type of button: submit, reset, or button.
   */
  type?: HTMLButtonElement["type"]
  /**
   * Disabled button element.
   */
  disabled?: boolean
  /**
   * Show arrow on button.
   */
  showIcon?: boolean
}

const Button = ({
  href,
  buttonElem = false,
  variant = "primary",
  size = "default",
  centered = false,
  showIcon = true,
  children,
  className,
  ...props
}: ButtonProps) => {
  const isSecondary = variant === "secondary"

  const classes = twMerge(
    "group btn w-fit font-normal no-underline transition rounded-csp-sm hocus:underline",
    clsx({
      "bg-cardinal-red border border-csp-digital-red-xdark text-white hocus:bg-digital-red hocus:text-white":
        variant === "primary",
      "border-2 border-digital-red text-digital-red hocus:border-black": variant === "secondary",
      "border border-stone text-archway-dark bg-transparent hocus:bg-archway-dark hocus:text-csp-cream":
        variant === "ghost",
      "bg-digital-red/80 border border-csp-digital-red-xdark text-csp-cream hocus:bg-digital-red hocus:text-csp-cream":
        variant === "digitalred",
      "bg-archway-dark/80 border border-stone text-csp-cream hocus:bg-archway-dark hocus:text-csp-cream":
        variant === "archway",
      "rounded-full border border-fog-dark text-digital-red hocus:border-digital-red-dark hocus:bg-archway hocus:text-white py-4 px-4":
        variant === "search",
      "py-4 px-6 text-18": !isSecondary && size === "default",
      "pt-4 pb-5 px-7": isSecondary && size === "default",
      "pt-7 pb-8 px-12 text-5xl font-serif": !isSecondary && size === "big",
      "pt-7 pb-8 px-12 font-serif": isSecondary && size === "big",
      "py-4": size === "round",
      "flex items-center mx-auto": centered,
      "inline-block text-center": !centered,
    }),
    className
  )

  const icon = showIcon && (
    <ArrowRightIcon height={25} className="ml-2 inline-block transition-all group-hocus-visible:translate-x-1" />
  )

  if (!href || buttonElem) {
    return (
      <button className={classes} type="button" {...props}>
        {children}
        {icon}
      </button>
    )
  }

  return (
    <Link href={getLinkHref(href)} className={classes} {...props}>
      {children}
      {icon}
    </Link>
  )
}

export default Button
