import {HtmlHTMLAttributes} from "react"
import {Maybe, ParagraphStanfordCard} from "@lib/gql/__generated__/graphql"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {H2, H3, H4} from "@components/elements/headers"
import Wysiwyg from "@components/elements/wysiwyg"
import ActionLink from "@components/elements/action-link"
import Button from "@components/elements/button"
import ImageCard from "@components/patterns/image-card"
import {CardParagraphBehaviors} from "drupal"
import {getIdFromText} from "@lib/utils/text-tools"
import cn from "@lib/utils/className"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordCard
}

const CardParagraph = ({paragraph, ...props}: Props) => {
  const behaviors = getParagraphBehaviors<CardParagraphBehaviors>(paragraph)

  const cardtype = behaviors.su_card_styles?.csp_card_variant ?? "default"
  const isPoster = cardtype === "poster"

  const image = paragraph.suCardMedia?.__typename === "MediaImage" ? paragraph.suCardMedia.mediaImage : undefined
  const videoUrl =
    paragraph.suCardMedia?.__typename === "MediaVideo" ? paragraph.suCardMedia.mediaOembedVideo : undefined

  const headerTagChoice = (behaviors.su_card_styles?.heading || "h2").split(".", 2)
  const headerTag = headerTagChoice[0]
  const headerClasses = cn(
    "mb-0 mt-0 text-archway-dark",
    headerTagChoice[1]?.replace(".", " ").replace("su-font-splash", "type-2 font-bold") || undefined,
    {"type-3 max-w-[55rem] text-csp-cream": isPoster},
    {"sr-only": behaviors.su_card_styles?.hide_heading}
  )

  const id = headerTag !== "div" ? getIdFromText(paragraph.suCardHeader) : undefined
  const bgColor = isPoster ? paragraph.cspCardBgColor?.color : undefined

  console.log("bgColor value:", bgColor, "isPoster:", isPoster)

  return (
    <ImageCard
      {...props}
      aria-labelledby={id}
      imageUrl={image?.url}
      imageAlt={image?.alt}
      videoUrl={videoUrl}
      isArticle={!!paragraph.suCardHeader && headerTag !== "div"}
      variant={cardtype}
      bgColor={cardtype === "poster" ? paragraph.cspCardBgColor?.color : undefined}
    >
      {paragraph.suCardHeader && (
        <>
          {headerTag === "h2" && (
            <H2 id={id} className={cn("type-4", headerClasses)}>
              {paragraph.suCardHeader}
            </H2>
          )}
          {headerTag === "h3" && (
            <H3 id={id} className={headerClasses}>
              {paragraph.suCardHeader}
            </H3>
          )}
          {headerTag === "h4" && (
            <H4 id={id} className={headerClasses}>
              {paragraph.suCardHeader}
            </H4>
          )}
          {headerTag === "div" && <div className={headerClasses}>{paragraph.suCardHeader}</div>}
        </>
      )}

      {paragraph.suCardSuperHeader && (
        <div
          className={cn("rs-mb-neg1 order-first font-sans text-19 font-normal uppercase text-archway-dark", {
            "tracking-[1.9px] text-csp-cream": isPoster,
          })}
        >
          {paragraph.suCardSuperHeader}
        </div>
      )}

      <Wysiwyg
        className={cn(
          !isPoster && "rs-mt-1 text-archway-light [&_*]:text-16 [&_*]:leading-[1.5] md:[&_*]:text-19",
          isPoster && "type-2 text-csp-cream",
          "[&_a]:underline [&_a]:hocus:text-white [&_a]:hocus:no-underline",
          {"[&_a]:text-csp-peach": isPoster && bgColor === "8c1515"},
          {"[&_a]:text-csp-plum-xlight": isPoster && bgColor === "620059"},
          {"[&_a]:text-lagunita-40": isPoster && bgColor === "007c92"},
          {"[&_a]:text-csp-palo-alto-50": isPoster && bgColor === "175e54"},
          {"[&_a]:text-archway-light": isPoster && bgColor === "f4f4f4"},
          {"[&_a]:text-csp-peach": isPoster && bgColor === "2e2d29"}
        )}
        html={paragraph.suCardBody?.processed}
      />

      {paragraph.suCardLink?.url && (
        <>
          {behaviors.su_card_styles?.link_style === "action" && (
            <ActionLink
              className={cn(
                "rs-mt-2 items-center font-sans text-18 font-normal text-archway-dark no-underline hocus:underline",
                {
                  "[&_svg]:hocus:fill-text-csp-peach text-csp-cream hocus:text-csp-peach": isPoster,
                }
              )}
              href={paragraph.suCardLink.url}
            >
              {paragraph.suCardLink.title}
            </ActionLink>
          )}
          {behaviors.su_card_styles?.link_style !== "action" && (
            <Button className="rs-mt-2" href={paragraph.suCardLink.url}>
              {paragraph.suCardLink.title}
            </Button>
          )}
        </>
      )}
    </ImageCard>
  )
}

export default CardParagraph
