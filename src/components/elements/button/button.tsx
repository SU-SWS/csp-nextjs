import twMerge from "@lib/utils/twMerge"
import {HtmlHTMLAttributes, MouseEventHandler} from "react"
import {Maybe} from "@lib/gql/__generated__/graphql"
import {LinkProps} from "next/dist/client/link"
import Link from "next/link"
import {getLinkHref} from "@components/elements/link"
import {ArrowRightIcon} from "@heroicons/react/20/solid"
import {
  buttonBase,
  buttonVariants,
  buttonSizes,
  buttonSecondarySizes,
  type ButtonVariantType,
  type ButtonSizeType,
} from "./button.styles"

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

export const Button = ({
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
    buttonBase,
    buttonVariants[variant],
    isSecondary ? buttonSecondarySizes[size] : buttonSizes[size],
    centered ? "flex items-center mx-auto" : "inline-block text-center",
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
