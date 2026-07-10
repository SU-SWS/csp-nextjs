import React, {HtmlHTMLAttributes} from "react"
import {ParagraphStanfordPageTitleBanner} from "@lib/gql/__generated__/graphql"
import {H1} from "@components/elements/headers"
import HeroBanner from "@components/patterns/hero-banner"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordPageTitleBanner
  pageTitle: string
}

const PageTitleBannerParagraph = ({paragraph, pageTitle, ...props}: Props) => {
  return (
    <HeroBanner
      {...props}
      imageUrl={paragraph.suTitleBannerImage?.mediaImage.url}
      imageAlt={paragraph.suTitleBannerImage?.mediaImage.alt}
      eagerLoadImage
      className="mx-[.4rem] overflow-hidden rounded-[2rem] bg-archway-dark 3xl:mx-auto 3xl:max-w-[160rem]"
    >
      <span className="order-1 block h-[.4rem] w-[5rem] rounded-md bg-cardinal-red" aria-hidden="true" />
      <H1 className="type-5 order-2 m-0 mb-[-10px] p-0 font-serif font-normal text-csp-cream">{pageTitle}</H1>
    </HeroBanner>
  )
}
export default PageTitleBannerParagraph
