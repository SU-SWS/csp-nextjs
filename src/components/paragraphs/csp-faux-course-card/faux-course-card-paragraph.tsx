import {HtmlHTMLAttributes} from "react"
import Image from "next/image"
import Link from "@components/elements/link"
import {H2} from "@components/elements/headers"
import {ParagraphCspFauxCourseCard} from "@lib/gql/__generated__/graphql"
import CourseCardInstructor from "@components/paragraphs/csp-faux-course-card/course-card-instructor"
import cn from "@lib/utils/className"
import {urlToHttpOptions} from "url"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphCspFauxCourseCard
}

/**
 * Stub rendering of the Faux Course Card paragraph (CSP-105).
 */
const FauxCourseCardParagraph = ({paragraph, ...props}: Props) => {
  const image = paragraph.cspCourseCardImage?.mediaImage
  const url = paragraph.cspCourseCardLink?.url
  // TODO: Make this dependent on field from paragraph.
  const Heading = H2

  return (
    <div
      {...props}
      className={cn(
        "flex max-w-[116rem] flex-col justify-self-center rounded-csp-md border border-fog-dark @9xl:flex-row",
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
            sizes="auto, 40rem, (min-width: 880px) 54rem"
          />
        </div>
      )}

      <div className="rs-pt-1 rs-pb-3 rs-px-3 flex min-w-0 max-w-600 flex-col">
        {url && (
          <Heading className="rs-mb-1 type-1 order-3 mt-0">
            <Link className="font-normal text-archway-dark hocus:text-digital-red" href={url}>
              {paragraph.cspCourseCardTitle}
            </Link>
          </Heading>
        )}
        {!url && <Heading className="rs-mb-1 type-1 order-3 mt-0">{paragraph.cspCourseCardTitle}</Heading>}

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
