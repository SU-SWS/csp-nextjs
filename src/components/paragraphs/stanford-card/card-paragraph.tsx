import {HtmlHTMLAttributes} from "react"
import {ParagraphStanfordCard} from "@lib/gql/__generated__/graphql"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {H2, H3, H4} from "@components/elements/headers"
import Wysiwyg from "@components/elements/wysiwyg"
import ActionLink from "@components/elements/action-link"
import {ChevronRightIcon} from "@heroicons/react/20/solid"
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
    "type-2 mb-0 mt-0 font-normal text-archway-dark",
    headerTagChoice[1]?.replace(".", " ").replace("su-font-splash", "type-2 font-bold") || undefined,
    {
      "fluid-type-3 max-w-[55rem] text-csp-cream": isPoster,
      "sr-only": behaviors.su_card_styles?.hide_heading,
    }
  )

  const id = headerTag !== "div" ? getIdFromText(paragraph.suCardHeader) : undefined
  const bgColor = isPoster ? paragraph.cspCardBgColor?.color : undefined

  return (
    <ImageCard
      {...props}
      aria-labelledby={id}
      imageUrl={image?.url}
      imageAlt={image?.alt}
      videoUrl={videoUrl}
      isArticle={!!paragraph.suCardHeader && headerTag !== "div"}
      variant={cardtype}
      bgColor={bgColor}
    >
      {paragraph.suCardHeader && (
        <>
          {headerTag === "h2" && (
            <H2 id={id} className={headerClasses}>
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
            "text-archway-dark": isPoster && bgColor === "f4f4f4",
          })}
        >
          {paragraph.suCardSuperHeader}
        </div>
      )}

      <Wysiwyg
        className={cn({
          "rs-mt-1 text-archway-light [&_*]:text-16 [&_*]:leading-[1.5] md:[&_*]:text-19 [&_a]:hocus:text-archway-dark":
            !isPoster,
          "type-2 [&_a]:underline [&_a]:hocus:text-csp-cream [&_a]:hocus:no-underline": isPoster,
          "text-csp-cream [&_a]:text-csp-peach": isPoster && bgColor === "8c1515",
          "text-csp-cream [&_a]:text-csp-plum-xlight": isPoster && bgColor === "620059",
          "text-csp-cream [&_a]:text-lagunita-40": isPoster && bgColor === "007c92",
          "text-csp-cream [&_a]:text-csp-palo-alto-50": isPoster && bgColor === "175e54",
          "text-archway-dark [&_a]:text-archway-light [&_a]:hocus:text-archway-dark": isPoster && bgColor === "f4f4f4",
        })}
        html={paragraph.suCardBody?.processed}
      />

      {paragraph.suCardLink?.url && (
        <>
          {behaviors.su_card_styles?.link_style === "action" && (
            <ActionLink
              isPoster={isPoster}
              className={cn(
                "rs-mt-2 items-center font-sans text-18 font-normal text-archway-dark no-underline hocus:underline",
                {
                  "[&_svg]:hocus:fill-text-csp-peach relative flex gap-4 pr-[25px] text-csp-cream hocus:text-csp-peach":
                    isPoster,
                }
              )}
              href={paragraph.suCardLink.url}
            >
              {paragraph.suCardLink.title}
              {isPoster && (
                <div className="size-[2.6rem] rounded-full border border-digital-red-dark bg-digital-red hocus:bg-cardinal-red">
                  <ChevronRightIcon
                    height={25}
                    className="inline-block fill-white transition-all group-hocus-visible:translate-x-1"
                  />
                </div>
              )}
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
