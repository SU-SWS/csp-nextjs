import {HtmlHTMLAttributes} from "react"
import Image from "next/image"
import Link from "@components/elements/link"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {H2, H3, H4} from "@components/elements/headers"
import {CardParagraphBehaviors} from "drupal"
import {ParagraphCspFauxCourseCard} from "@lib/gql/__generated__/graphql"
import CourseCardInstructor from "@components/paragraphs/csp-faux-course-card/course-card-instructor"
import cn from "@lib/utils/className"
import {getIdFromText} from "@lib/utils/text-tools"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphCspFauxCourseCard
}

/**
 * Stub rendering of the Faux Course Card paragraph (CSP-105).
 */
const FauxCourseCardParagraph = ({paragraph, ...props}: Props) => {
  const image = paragraph.cspCourseCardImage?.mediaImage
  const url = paragraph.cspCourseCardLink?.url
  const behaviors = getParagraphBehaviors<CardParagraphBehaviors>(paragraph)
  const headerTagChoice = (behaviors.su_card_styles?.heading || "h2").split(".", 2)
  const headerTag = headerTagChoice[0]
  const headerClasses = cn(
    "mb-0 mt-0 text-archway-dark",
    headerTagChoice[1]?.replace(".", " ").replace("su-font-splash", "type-2 font-bold") || undefined,
    {"sr-only": behaviors.su_card_styles?.hide_heading}
  )

  const id = headerTag !== "div" ? getIdFromText(paragraph.suCardHeader) : undefined

  return (
    <div
      {...props}
      className={cn(
        "relative flex max-w-[116rem] flex-col justify-self-center rounded-csp-md border border-fog-dark @9xl:flex-row",
        props.className
      )}
    >
      {image?.url && (
        <div className="min-w-40rem relative mx-auto mt-[.6rem] aspect-[54/29] w-full max-w-[calc(100%_-_1.2rem)] flex-grow self-start overflow-hidden rounded-csp-sm @9xl:ml-[0.6rem] @9xl:mr-[0.6rem] @9xl:min-w-[54rem]">
          <Image
            src={image.url}
            alt={image.alt || ""}
            fill
            className="border object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>
      )}

      <div className="rs-pt-1 rs-pb-3 rs-px-3 flex min-w-0 max-w-600 flex-col">
        {url && (
          <H2 className="rs-mb-1 type-1 order-3 mt-0">
            <Link className="font-normal text-archway-dark hocus:text-digital-red" href={url}>
              {paragraph.cspCourseCardTitle}
            </Link>
          </H2>
        )}
        {!url && <H2 className="rs-mb-1 type-1 order-3 mt-0">{paragraph.cspCourseCardTitle}</H2>}

        {paragraph.suCardHeader && (
          <>
            {headerTag === "h2" && (
              <H2 id={id} className={cn("type-2", headerClasses)}>
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

        {(paragraph.cspCourseCardFormat || paragraph.cspCourseCardLocation) && (
          <div className="order-2 mb-[.8rem] font-sans text-16 font-normal text-archway-light md:mb-[.9rem] 2xl:mb-4">
            {paragraph.cspCourseCardFormat}
            {paragraph.cspCourseCardFormat && paragraph.cspCourseCardLocation && (
              <span className="mx-6">&nbsp;|&nbsp;</span>
            )}
            {paragraph.cspCourseCardLocation}
          </div>
        )}

        {!!paragraph.cspCourseCardInstructors?.length && (
          <ul className="order-4 flex list-none flex-col gap-8 p-0">
            {paragraph.cspCourseCardInstructors.map(instructor => (
              <li key={instructor.uuid}>
                <CourseCardInstructor
                  instructor={instructor}
                  headingElement={paragraph.cspCourseCardTitle ? "h3" : "div"}
                />
              </li>
            ))}
          </ul>
        )}

        {!!paragraph.cspCourseCardColor?.color && (
          <div
            className={cn("rs-mb-1 order-1 h-[.4rem] w-20 rounded", props.className, {
              "bg-olive": paragraph.cspCourseCardColor?.color === "8F993E",
              "bg-archway-light": paragraph.cspCourseCardColor?.color === "766253",
              "bg-cardinal-red": paragraph.cspCourseCardColor?.color === "8c1515",
              "bg-plum": paragraph.cspCourseCardColor?.color === "81337A",
              "bg-lagunita-light": paragraph.cspCourseCardColor?.color === "009AB4",
              "bg-palo-verde": paragraph.cspCourseCardColor?.color === "279989",
            })}
          />
        )}
      </div>
    </div>
  )
}

export default FauxCourseCardParagraph
