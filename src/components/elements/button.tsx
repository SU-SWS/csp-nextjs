import twMerge from "@lib/utils/twMerge"
import {HtmlHTMLAttributes, MouseEventHandler} from "react"
import {Maybe} from "@lib/gql/__generated__/graphql"
import {clsx} from "clsx"
import {LinkProps} from "next/dist/client/link"
import Link from "next/link"
import {getLinkHref} from "@components/elements/link"
import {ArrowRightIcon} from "@heroicons/react/20/solid"

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
   * Display a digital red with 80% opacity styled button.
   */
  digitalred80?: boolean
  /**
   * Display an archway styled button.
   */
  archway?: boolean
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
  archway = false,
  digitalred80 = false,
  centered = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  const standardClasses = clsx({
    "flex items-center w-fit mx-auto": centered,
    "inline-block text-center w-fit": !centered,
    // Big Primary (existing)
    "btn btn--big transition text-5xl text-white border-csp-digital-red-xdark border rounded-csp-sm hocus:text-white bg-cardinal-red font-serif hocus:bg-black no-underline hocus:underline py-6 px-12 font-normal border-digital-red-xdark":
      big && !secondary && !ghost && !digitalred80 && !archway,

    // Secondary (existing)
    "btn btn--secondary transition text-digital-red border-2 border-digital-red hocus:border-black no-underline hocus:underline py-4 px-8 font-normal":
      !big && secondary && !ghost && !digitalred80 && !archway,

    // Big secondary (existing)
    "btn btn--big btn--secondary transition text-5xl text-digital-red border-2 border-digital-red hocus:border-black no-underline hocus:underline py-6 px-12 font-normal font-serif":
      big && secondary && !ghost && !digitalred80 && !archway,

    // Default primary (existing)
    "btn bg-cardinal-red border-csp-digital-red-xdark border rounded-csp-sm font-normal text-white hocus:bg-digital-red hocus:text-white py-4 px-8 no-underline hocus:underline transition":
      !big && !secondary && !ghost && !digitalred80 && !archway,

    // NEW: Ghost small -- transparent bg, white border, white text, fills on hover
    "btn btn--ghost transition text-archway-dark border border-stone hocus:bg-archway-dark hocus:text-csp-cream no-underline hocus:underline py-4 px-8 font-normal text-18 rounded-csp-sm":
      !big && ghost,

    // NEW: Ghost big -- same treatment at large scale
    "btn btn--ghost btn--big transition text-5xl text-archway-dark border rounded-csp-sm border-stone hocus:bg-archway-dark hocus:text-csp-cream no-underline hocus:underline py-7 px-12 font-normal":
      big && ghost,

    // NEW: Cardinal small -- transparent bg, white border, white text, fills on hover
    "btn btn--cardinal80 transition bg-digital-red/80 text-csp-cream border-csp-digital-red-xdark border hocus:bg-digital-red hocus:text-csp-cream no-underline hocus:underline py-4 px-8 font-normal text-18 rounded-csp-sm":
      !big && digitalred80,

    // NEW: Cardinal big -- same treatment at large scale
    "btn btn--cardinal80 btn--big bg-digital-red/80 transition text-5xl text-csp-cream border-csp-digital-red-xdark border rounded-csp-sm hocus:bg-digital-red hocus:text-csp-cream no-underline hocus:underline py-7 px-12 font-normal font-serif":
      big && digitalred80,

    // NEW: Archway small -- transparent bg, white border, white text, fills on hover
    "btn btn--archway transition bg-archway-dark/80 text-csp-cream border-stone border hocus:bg-archway-dark hocus:text-csp-cream no-underline hocus:underline py-4 px-8 font-normal text-18 rounded-csp-sm":
      !big && archway,

    // NEW: Archway big -- same treatment at large scale
    "btn btn--archway btn--big bg-archway-dark/80 transition text-5xl text-csp-cream border-stone border rounded-csp-sm hocus:bg-archway-dark hocus:text-csp-cream no-underline hocus:underline py-7 px-12 font-normal":
      big && archway,
  })

  if (!href || buttonElem) {
    return (
      <button className={twMerge(standardClasses, className)} type="button" {...props}>
        {children}
        <ArrowRightIcon
          height={25}
          className="ml-2 inline-block fill-csp-cream transition-all group-hocus-visible:translate-x-1"
        />
      </button>
    )
  }

  return (
    <Link href={getLinkHref(href)} className={twMerge(standardClasses, className)} {...props}>
      {children}
      <ArrowRightIcon
        height={25}
        className="ml-2 inline-block fill-csp-cream transition-all group-hocus-visible:translate-x-1"
      />
    </Link>
  )
}

export default Button
