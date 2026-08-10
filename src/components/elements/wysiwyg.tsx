import {Table, Thead, Th, Tbody, Tr, Td} from "@components/elements/responsive-tables/tables"
import Link from "@components/elements/link"
import parse, {HTMLReactParserOptions, Element, domToReact, attributesToProps, DOMNode} from "html-react-parser"
import Image from "next/image"
import Oembed from "@components/elements/ombed"
import React, {HtmlHTMLAttributes, ReactElement} from "react"
import {H2, H3, H4, H5, H6} from "@components/elements/headers"
import {ChevronRightIcon} from "@heroicons/react/20/solid"
import cn from "@lib/utils/className"
import {Maybe} from "@lib/gql/__generated__/graphql"
import Mathjax from "@components/tools/mathjax"
import Script from "next/script"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  /**
   * HTML string.
   */
  html?: Maybe<string>
}

const Wysiwyg = ({html, className, ...props}: Props): ReactElement | undefined => {
  if (!html) return
  // Remove comments and empty lines.
  html = html.replaceAll(/<!--[\s\S]*?-->/g, "").replaceAll(/(^(\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm, "")

  const addMathJax = html.match(/\$\$.*\$\$/) || html.match(/\\\[.*\\\]/) || html.match(/\\\(.*\\\)/)
  return (
    <div className={cn("wysiwyg", className)} {...props}>
      {addMathJax && <Mathjax />}
      {formatHtml(html)}
    </div>
  )
}

const hasLink = (children: React.ReactNode): boolean => {
  return React.Children.toArray(children).some(child => React.isValidElement(child) && child.type === Link)
}

const fixProps = (props: Record<PropertyKey, string | boolean>) => {
  if (!props.className) delete props.className

  delete props["data-entity-substitution"]
  delete props["data-entity-type"]
  delete props["data-entity-uuid"]
}

const options: HTMLReactParserOptions = {
  replace: domNode => {
    if (domNode instanceof Element) {
      const nodeProps = attributesToProps(domNode.attribs)
      nodeProps.className = fixClasses(nodeProps.className)
      fixProps(nodeProps)

      const NodeName = domNode.name as React.ElementType
      const children: DOMNode[] = domNode.children as DOMNode[]

      switch (domNode.name) {
        case "a":
          return (
            <Link href={nodeProps.href as string} {...nodeProps}>
              {domToReact(children, options)}
            </Link>
          )

        case "div":
        case "article":
          delete nodeProps.role
          if (nodeProps.className?.includes("media-entity-wrapper")) {
            return cleanMediaMarkup(domNode)
          }
          return <NodeName {...nodeProps}>{domToReact(children, options)}</NodeName>

        case "figure":
          return cleanMediaMarkup(domNode)

        case "p":
          nodeProps.className = cn("max-w-[100ch] text-21 leading-[1.7]", nodeProps.className)
          return <NodeName {...nodeProps}>{domToReact(children, options)}</NodeName>

        case "script":
          return <Script {...nodeProps}>{domToReact(children, options)}</Script>
        case "h2": {
          const headingContent = domToReact(children, options)
          return (
            <H2 {...nodeProps} className="hocus:decoration-[.25rem] hocus:underline-offset-[.4rem]">
              {headingContent}
              {hasLink(headingContent) && <ChevronRightIcon className="inline h-20 fill-digital-red" />}
            </H2>
          )
        }
        case "h3": {
          const headingContent = domToReact(children, options)
          return (
            <H3 {...nodeProps} className="hocus:decoration-[.25rem] hocus:underline-offset-[.4rem]">
              {headingContent}
              {hasLink(headingContent) && <ChevronRightIcon className="inline h-16 fill-digital-red" />}
            </H3>
          )
        }
        case "h4": {
          const headingContent = domToReact(children, options)
          return (
            <H4 {...nodeProps} className="hocus:decoration-[.15rem] hocus:underline-offset-[.2rem]">
              {headingContent}
              {hasLink(headingContent) && <ChevronRightIcon className="inline h-14 fill-digital-red" />}
            </H4>
          )
        }
        case "h5": {
          const headingContent = domToReact(children, options)
          return (
            <H5 {...nodeProps} className="hocus:decoration-[.15rem] hocus:underline-offset-[.2rem]">
              {headingContent}
              {hasLink(headingContent) && <ChevronRightIcon className="inline h-12 fill-digital-red" />}
            </H5>
          )
        }
        case "h6": {
          const headingContent = domToReact(children, options)
          return (
            <H6 {...nodeProps} className="hocus:decoration-[.15rem] hocus:underline-offset-[.2rem]">
              {headingContent}
              {hasLink(headingContent) && <ChevronRightIcon className="inline h-12 fill-digital-red" />}
            </H6>
          )
        }
        case "table":
          return <Table {...nodeProps}>{domToReact(children, options)}</Table>
        case "thead":
          return <Thead {...nodeProps}>{domToReact(children, options)}</Thead>
        case "tbody":
          return <Tbody {...nodeProps}>{domToReact(children, options)}</Tbody>
        case "th":
          return <Th {...nodeProps}>{domToReact(children, options)}</Th>
        case "td":
          return <Td {...nodeProps}>{domToReact(children, options)}</Td>
        case "tr":
          return <Tr {...nodeProps}>{domToReact(children, options)}</Tr>
        case "ul":
          // https://v3.tailwindcss.com/docs/preflight#lists-are-unstyled
          nodeProps.className = cn(nodeProps.className, {
            "list-circle": nodeProps?.type === "circle",
            "list-square": nodeProps?.type === "square",
          })
          fixProps(nodeProps)
          return <ul {...nodeProps}>{domToReact(children, options)}</ul>
        case "ol":
          // https://v3.tailwindcss.com/docs/preflight#lists-are-unstyled
          nodeProps.className = cn(nodeProps.className, {
            "list-lower-alpha": nodeProps?.type === "a",
            "list-upper-alpha": nodeProps?.type === "A",
            "list-lower-roman": nodeProps?.type === "i",
            "list-upper-roman": nodeProps?.type === "I",
          })
          fixProps(nodeProps)
          return <ol {...nodeProps}>{domToReact(children, options)}</ol>
        case "hr":
          return <hr className="border-black" />
        case "pre":
          nodeProps.className = cn(
            nodeProps.className,
            "[&_code]:mb-5 [&_code]:block [&_code]:text-wrap [&_code]:rounded [&_code]:border [&_code]:border-black-20 [&_code]:bg-black-10 [&_code]:p-10 [&_code]:text-black"
          )
          return <NodeName {...nodeProps}>{domToReact(children, options)}</NodeName>
        case "code":
        case "tfoot":
        case "b":
        case "cite":
        case "dt":
        case "dl":
        case "dd":
        case "i":
        case "aside":
        case "abbr":
        case "span":
        case "blockquote":
        case "li":
        case "strong":
        case "em":
        case "s":
        case "sub":
        case "sup":
        case "caption":
          return <NodeName {...nodeProps}>{domToReact(children, options)}</NodeName>

        // Void element tags like <br>, <hr>, <source>, etc.
        // @see https://developer.mozilla.org/en-US/docs/Glossary/Void_element
        default:
          return <NodeName {...nodeProps} />
      }
    }
  },
}

const fixClasses = (classes?: string | boolean): string => {
  if (!classes) return ""
  // Pad the classes so that we can easily replace a whole class instead of parts of them.
  classes = ` ${classes} `

  classes = classes
    .replaceAll(" su-", " ")
    .replaceAll(" text-align-center ", " text-center ")
    .replaceAll(" text-align-right ", " text-right ")
    .replaceAll(" align-center ", " mx-auto ")
    .replaceAll(" align-left ", " float-left mr-10 mb-10 ")
    .replaceAll(" align-right ", " float-right ml-10 mb-10 ")
    .replaceAll(" visually-hidden ", " sr-only ")
    .replaceAll(" font-splash ", " type-4 font-normal font-sans ")
    .replaceAll(" callout-text ", " font-normal type-2 font-sans ")
    .replaceAll(" related-text ", " border border-fog-dark rounded-csp-md p-16 font-normal ")
    .replaceAll(" intro-text ", " type-2 font-normal font-sans ")
    .replaceAll(" quote-text ", " p-[4.8rem] mb-32 type-1 border-l-3 border-fog-dark ")
    .replaceAll(
      " drop-cap ",
      " type-2 font-normal font-sans first-letter:san-serif first-letter:font-bold first-letter:type-6 first-letter:float-left first-letter:my-2 first-letter:mr-4 "
    )
    .replaceAll(/ tablesaw[\w-] /g, " ")
  return cn(classes)
}

const cleanMediaMarkup = (node: Element) => {
  const nodeProps = attributesToProps(node.attribs)
  nodeProps.className = fixClasses(nodeProps.className)

  const getImage = (node: Element): Record<string, string> | undefined => {
    let img
    if (node.name === "img") {
      const attribs = node.attribs
      attribs.width = attribs.width || attribs["data-width"]
      attribs.height = attribs.height || attribs["data-height"]
      return attribs
    }
    if (node.children.length > 0) {
      let child
      for (child of node.children) {
        if (child instanceof Element) {
          img = getImage(child)
          if (img) return img
        }
      }
    }
  }
  const getFigCaption = (node: Element): DOMNode[] | undefined => {
    let caption
    if (node.name === "figcaption") {
      return node.children as DOMNode[]
    }
    if (node.children.length > 0) {
      let child
      for (child of node.children) {
        if (child instanceof Element) {
          caption = getFigCaption(child)
          if (caption) return caption
        }
      }
    }
  }

  const getOembedUrl = (node: Element): string | undefined => {
    const src = node.attribs?.src || node.attribs["data-src"]
    if (src?.includes("/media/oembed")) {
      return decodeURIComponent(src).replace(/^.*url=(.*)?&.*$/, "$1")
    }
    if (node.children.length > 0) {
      let child
      for (child of node.children) {
        if (child instanceof Element) {
          const url: string | undefined = getOembedUrl(child)
          if (url) return url
        }
      }
    }
  }

  // Special handling of Oembeds
  const oembedUrl = getOembedUrl(node)
  if (oembedUrl) {
    return <Oembed url={oembedUrl} />
  }

  const image = getImage(node)
  if (image) {
    let {src} = image
    const {alt, width, height} = image
    if (!src) return

    if (src?.startsWith("/")) src = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + src

    const figCaption = getFigCaption(node)

    if (figCaption) {
      nodeProps.className = cn("table", nodeProps.className)
      if (nodeProps.className?.includes("mx-auto")) nodeProps.className += " w-full"
      delete nodeProps.role
      return (
        <figure {...nodeProps}>
          <WysiwygImage src={src} alt={alt} height={height} width={width} />
          <figcaption className="table-caption caption-bottom text-center">
            {domToReact(figCaption, options)}
          </figcaption>
        </figure>
      )
    }
    return <WysiwygImage src={src} alt={alt} height={height} width={width} {...nodeProps} />
  }
  const NodeName: React.ElementType = node.name as React.ElementType
  return <NodeName {...nodeProps}>{domToReact(node.children as DOMNode[], options)}</NodeName>
}

const WysiwygImage = ({
  src,
  alt,
  height,
  width,
  className,
}: {
  src: string
  alt?: Maybe<string>
  height?: Maybe<string | number>
  width?: Maybe<string | number>
  className?: string
}) => {
  if (width && height) {
    return (
      <Image
        className={cn(fixClasses(className), "mb-10")}
        src={src.trim()}
        alt={alt ? alt.trim() : ""}
        height={parseInt(`${height}`)}
        width={parseInt(`${width}`)}
        unoptimized
      />
    )
  }
  return (
    <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden">
      <Image
        className="object-cover object-center"
        src={src.trim()}
        alt={alt?.trim() || ""}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 1500px"
      />
    </div>
  )
}

const formatHtml = (html: string) => parse(html || "", options)

export default Wysiwyg
