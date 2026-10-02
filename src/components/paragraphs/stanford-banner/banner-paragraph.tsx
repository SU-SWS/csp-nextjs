import React, {HtmlHTMLAttributes} from "react"
import {ParagraphStanfordBanner} from "@lib/gql/__generated__/graphql"
import {H2, H3, H4} from "@components/elements/headers"
import Wysiwyg from "@components/elements/wysiwyg"
import Button from "@components/elements/button"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import cn from "@lib/utils/className"
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
    >
      {hasCard && (
        <>
          <div className="@6xl:max-w-[55rem]">
            {paragraph.suBannerHeader && (
              <>
                {headerTag === "h2" && (
                  <H2
                    id={id}
                    className={cn(headerClasses, "no-anchor my-0 font-serif type-3 font-normal text-csp-cream")}
                  >
                    {paragraph.suBannerHeader}
                  </H2>
                )}
                {headerTag === "h3" && (
                  <H3 id={id} className={cn(headerClasses, "my-0 text-csp-cream")}>
                    {paragraph.suBannerHeader}
                  </H3>
                )}
                {headerTag === "h4" && (
                  <H4 id={id} className={cn(headerClasses, "my-0 text-csp-cream")}>
                    {paragraph.suBannerHeader}
                  </H4>
                )}
                {headerTag === "div" && (
                  <div className={cn(headerClasses, "text-csp-cream")}>{paragraph.suBannerHeader}</div>
                )}
              </>
            )}
          </div>

          {paragraph.suBannerSupHeader && (
            <div className="order-first mb-[1.75rem] font-sans type-2 font-normal text-fog-dark @6xl:max-w-[55rem]">
              {paragraph.suBannerSupHeader}
            </div>
          )}

          <Wysiwyg
            html={paragraph.suBannerBody?.processed}
            className="text-1.9 font-sans font-normal text-csp-cream @6xl:max-w-[55rem] [&_p]:text-19 [&_p]:leading-1.5"
          />

          {!!paragraph.suBannerButton?.length && (
            <ul className="m-0 list-none columns-1 gap-2.5 p-0 @7xl:columns-3">
              {paragraph.suBannerButton?.map((button, i) => (
                <li key={i}>
                  <Button
                    key={i}
                    href={button.url}
                    variant={button.attributes?.imageBannerButtonType === "archway" ? "archway" : "digitalred"}
                    className="m-5"
                  >
                    {button.title}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </HeroBanner>
  )
}
export default BannerParagraph
