import twMerge from "@lib/utils/twMerge"
import {HtmlHTMLAttributes, MouseEventHandler} from "react"
import {Maybe} from "@lib/gql/__generated__/graphql"
import {clsx} from "clsx"
import {LinkProps} from "next/dist/client/link"
import Link from "next/link"
import {getLinkHref} from "@components/elements/link"

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
   * Display a larger button.
   */
  big?: boolean
  /**
   * Display a secondary styled button.
   */
  secondary?: boolean
  /**
   * Display a ghost styled button.
   */
  ghost?: boolean
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
}

export const Button = ({
  href,
  buttonElem = false,
  big = false,
  secondary = false,
  ghost = false,
  centered = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  const standardClasses = clsx({
    "flex items-center w-fit mx-auto": centered,
    "inline-block text-center w-fit": !centered,
    // Primary (existing)
    "btn btn--big transition text-5xl text-white hocus:text-white bg-digital-red hocus:bg-black no-underline hocus:underline py-6 px-12 font-normal":
      big && !secondary && !ghost,

    // Secondary (existing)
    "btn btn--secondary transition text-digital-red border-2 border-digital-red hocus:border-black no-underline hocus:underline py-4 px-8 font-normal":
      !big && secondary && !ghost,

    // Big secondary (existing)
    "btn btn--big btn--secondary transition text-5xl text-digital-red border-2 border-digital-red hocus:border-black no-underline hocus:underline py-6 px-12 font-normal":
      big && secondary && !ghost,

    // Default primary (existing)
    "btn bg-digital-red font-normal text-white hocus:bg-black hocus:text-white py-4 px-8 no-underline hocus:underline transition":
      !big && !secondary && !ghost,

    // NEW: Ghost small -- transparent bg, white border, white text, fills on hover
    "btn btn--ghost transition text-archway-dark border border-stone hocus:bg-archway-dark hocus:text-csp-cream no-underline hocus:underline py-4 px-8 font-normal text-18 rounded-csp-sm":
      !big && ghost,

    // NEW: Ghost big -- same treatment at large scale
    "btn btn--ghost btn--big transition text-5xl text-archway-dark border rounded-csp-sm border-stone hocus:bg-archway-dark hocus:text-csp-cream no-underline hocus:underline py-7 px-12 font-normal":
      big && ghost,
  })

  if (!href || buttonElem) {
    return (
      <button className={twMerge(standardClasses, className)} type="button" {...props}>
        {children}
      </button>
    )
  }

  return (
    <Link href={getLinkHref(href)} className={twMerge(standardClasses, className)} {...props}>
      {children}
    </Link>
  )
}

export default Button
