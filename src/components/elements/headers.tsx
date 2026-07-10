import {HtmlHTMLAttributes} from "react"
import cn from "@lib/utils/className"
import {getIdFromText} from "@lib/utils/text-tools"

type Props = HtmlHTMLAttributes<HTMLHeadingElement>
type H1Props = Props & {
  /**
   * Show the red rule above the heading. Defaults to true.
   */
  showTopBorder?: boolean
}

const headingLinkClasses = "[&_a]:text-digital-red [&_a]:hocus:text-black [&_a]:hocus:underline"

export const H1 = ({children, className, showTopBorder = true, ...props}: H1Props) => {
  return (
    <h1
      className={cn(
        "type-4 font-serif font-normal",
        {
          "before:rs-mb-1 before:block before:h-1 before:w-full before:max-w-[6rem] before:rounded before:bg-cardinal-red before:content-['']":
            showTopBorder,
        },
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export const H2 = ({children, className, ...props}: Props) => {
  const id = typeof children === "string" ? getIdFromText(children) : undefined
  return (
    <h2
      id={id}
      className={cn(headingLinkClasses, "rs-mt-2 rs-mb-neg1 type-3 font-serif font-normal", className)}
      {...props}
    >
      {children}
    </h2>
  )
}

export const H3 = ({children, className, ...props}: Props) => {
  return (
    <h3 className={cn(headingLinkClasses, "rs-mb-0 rs-mt-2 type-2 font-serif font-normal", className)} {...props}>
      {children}
    </h3>
  )
}

export const H4 = ({children, className, ...props}: Props) => {
  return (
    <h4 className={cn(headingLinkClasses, "rs-mb-0 rs-mt-2 type-1 font-serif font-normal", className)} {...props}>
      {children}
    </h4>
  )
}

export const H5 = ({children, className, ...props}: Props) => {
  return (
    <h5 className={cn(headingLinkClasses, "rs-mb-0 rs-mt-2 type-1 font-serif font-normal", className)} {...props}>
      {children}
    </h5>
  )
}

export const H6 = ({children, className, ...props}: Props) => {
  return (
    <h6 className={cn(headingLinkClasses, "font-serif font-normal", className)} {...props}>
      {children}
    </h6>
  )
}

type HeadingProps = Props & {
  /**
   * Which heading level to display.
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

const Heading = ({children, level = 1, ...props}: HeadingProps) => {
  switch (level) {
    case 1:
      return <H1 {...props}>{children}</H1>
    case 2:
      return <H2 {...props}>{children}</H2>
    case 3:
      return <H3 {...props}>{children}</H3>
    case 4:
      return <H4 {...props}>{children}</H4>
    case 5:
      return <H5 {...props}>{children}</H5>
    case 6:
      return <H6 {...props}>{children}</H6>
  }
}
export default Heading
