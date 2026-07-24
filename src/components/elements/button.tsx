import cn from "@lib/utils/className"
import {HtmlHTMLAttributes, MouseEventHandler} from "react"
import {Maybe} from "@lib/gql/__generated__/graphql"
import {LinkProps} from "next/dist/client/link"
import Link from "next/link"
import {getLinkHref} from "@components/elements/link"
import {ArrowRightIcon} from "@heroicons/react/20/solid"

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

  const classes = cn(
    "btn group w-fit max-w-300 rounded-csp-sm font-normal no-underline transition hocus:underline",
    {
      "border border-csp-digital-red-xdark bg-cardinal-red text-white hocus:bg-digital-red hocus:text-white":
        variant === "primary",
      "border-archway-stone border text-archway-dark hocus:border-black": variant === "secondary",
      "border border-stone bg-transparent text-archway-dark hocus:bg-archway-dark hocus:text-csp-cream":
        variant === "ghost",
      "border border-csp-digital-red-xdark bg-digital-red/80 text-csp-cream hocus:bg-digital-red hocus:text-csp-cream":
        variant === "digitalred",
      "border border-stone bg-archway-dark/80 text-csp-cream hocus:bg-archway-dark hocus:text-csp-cream":
        variant === "archway",
      "rounded-full border border-fog-dark px-4 py-4 text-digital-red hocus:border-digital-red-dark hocus:bg-archway hocus:text-white":
        variant === "search",
      "py-4 pl-8 pr-6 font-sans text-18": !isSecondary && size === "default",
      "pb-5 pl-8 pr-7 pt-4 font-sans text-18": isSecondary && size === "default",
      "type-1 px-12 pb-8 pt-7 font-sans hocus:decoration-[.125rem] hocus:underline-offset-[.3rem]":
        !isSecondary && size === "big",
      "px-12 pb-8 pt-7": isSecondary && size === "big",
      "py-4": size === "round",
      "mx-auto flex items-center": centered,
      "inline-block text-center": !centered,
    },
    className
  )

  const icon = showIcon && (
    <ArrowRightIcon
      height={22}
      className="mb-[.3rem] ml-2 inline-block transition-all group-hocus-visible:translate-x-1"
    />
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
