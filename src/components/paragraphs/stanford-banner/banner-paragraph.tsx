import React, {HtmlHTMLAttributes} from "react"
import {ParagraphStanfordBanner} from "@lib/gql/__generated__/graphql"
import {H2, H3, H4} from "@components/elements/headers"
import Wysiwyg from "@components/elements/wysiwyg"
import Button from "@components/elements/button/button"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import twMerge from "@lib/utils/twMerge"
import HeroBanner from "@components/patterns/hero-banner"
import {BannerParagraphBehaviors} from "drupal"
import {getIdFromText} from "@lib/utils/text-tools"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordBanner
  eagerLoadImage?: boolean
}

const BannerParagraph = ({paragraph, eagerLoadImage, ...props}: Props) => {
  const behaviors = getParagraphBehaviors<BannerParagraphBehaviors>(paragraph)
  const hasCard =
    paragraph.suBannerHeader || paragraph.suBannerButton || paragraph.suBannerBody || paragraph.suBannerSupHeader

  const headerTagChoice = (behaviors.hero_pattern?.heading || "h2").split(".", 2)
  const headerTag = headerTagChoice[0]

  let headerClasses = headerTagChoice[1]?.replace(".", " ").replace("su-font-splash", "type-3 font-bold") || ""
  if (behaviors.hero_pattern?.hide_heading) headerClasses += " sr-only"

  const id = headerTag !== "div" ? getIdFromText(paragraph.suBannerHeader) : undefined

  return (
    <HeroBanner
      {...props}
      aria-labelledby={id}
      imageUrl={paragraph.suBannerImage?.mediaImage.url}
      imageAlt={paragraph.suBannerImage?.mediaImage.alt}
      isSection={!!paragraph.suBannerHeader && headerTag !== "div"}
      overlayPosition={behaviors.hero_pattern?.overlay_position}
      overlayColor={behaviors.hero_pattern?.overlay_color}
      eagerLoadImage={eagerLoadImage}
      overlayClassName="bg-gradient-to-b from-transparent to-csp-archway-xdark/95 md:bg-gradient-to-r md:from-csp-archway-xdark/95 md:to-transparent"
      childrenClassName="!bg-archway-dark 3sm:!bg-transparent"
      className="mx-[.4rem] overflow-hidden rounded-[20px] 3xl:mx-auto 3xl:max-w-[160rem]"
    >
      {hasCard && (
        <>
          {paragraph.suBannerHeader && (
            <>
              {headerTag === "h2" && (
                <H2 id={id} className={twMerge(headerClasses, "type-2 mb-0 font-serif font-normal text-csp-cream")}>
                  {paragraph.suBannerHeader}
                </H2>
              )}
              {headerTag === "h3" && (
                <H3 id={id} className={headerClasses}>
                  {paragraph.suBannerHeader}
                </H3>
              )}
              {headerTag === "h4" && (
                <H4 id={id} className={headerClasses}>
                  {paragraph.suBannerHeader}
                </H4>
              )}
              {headerTag === "div" && <div className={headerClasses}>{paragraph.suBannerHeader}</div>}
            </>
          )}

          {paragraph.suBannerSupHeader && (
            <div className="order-first text-09em font-semibold text-fog-dark">{paragraph.suBannerSupHeader}</div>
          )}

          <Wysiwyg html={paragraph.suBannerBody?.processed} className="type-0 text-csp-cream" />

          {paragraph.suBannerButton?.url && (
            <Button href={paragraph.suBannerButton.url}>{paragraph.suBannerButton.title}</Button>
          )}
        </>
      )}
    </HeroBanner>
  )
}
export default BannerParagraph
