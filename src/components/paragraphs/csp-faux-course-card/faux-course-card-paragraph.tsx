import {HtmlHTMLAttributes} from "react"
import Image from "next/image"
import Link from "@components/elements/link"
import {H2, H3} from "@components/elements/headers"
import {ParagraphCspFauxCourseCard} from "@lib/gql/__generated__/graphql"
import CourseCardInstructor from "@components/paragraphs/csp-faux-course-card/course-card-instructor"
import cn from "@lib/utils/className"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphCspFauxCourseCard
}

/**
 * Stub rendering of the Faux Course Card paragraph (CSP-105).
 */
const FauxCourseCardParagraph = ({paragraph, ...props}: Props) => {
  const image = paragraph.cspCourseCardImage?.mediaImage
  const url = paragraph.cspCourseCardLink?.url

  // Drupal restricts this to an approved palette and stores the hex without a
  // leading "#", so the value can be used as-is.
  const colorBar = paragraph.cspCourseCardColor?.color ? `#${paragraph.cspCourseCardColor.color}` : undefined

  const instructors = paragraph.cspCourseCardInstructors || []

  return (
    <div
      {...props}
      className={cn(
        "flex max-w-[116rem] flex-col justify-self-center rounded-csp-md border border-fog-dark @9xl:flex-row",
        props.className
      )}
    >
      {image?.url && (
        <div className="relative mx-auto mt-[.6rem] aspect-[54/29] w-full max-w-[calc(100%_-_1.2rem)] flex-grow self-start overflow-hidden rounded-csp-sm @9xl:ml-[0.6rem] @9xl:mr-[0.6rem] @9xl:w-auto @9xl:min-w-[56rem] @9xl:max-w-none">
          {url && (
            <Link href={url} className="relative block h-full">
              <Image src={image.url} alt={image.alt || ""} fill className="border-transparent object-cover" />
            </Link>
          )}
          {!url && <Image src={image.url} alt={image.alt || ""} fill className="border object-cover" />}
        </div>
      )}

      <div className="rs-pt-1 rs-pb-3 rs-px-3 min-w-0 max-w-600">
        {colorBar && (
          <div
            className={cn("rs-mb-1 h-[.4rem] w-20 rounded", props.className, {
              "bg-olive": paragraph.cspCourseCardColor?.color === "8F993E",
              "bg-archway-light": paragraph.cspCourseCardColor?.color === "766253",
              "bg-cardinal-red": paragraph.cspCourseCardColor?.color === "8c1515",
              "bg-plum": paragraph.cspCourseCardColor?.color === "81337A",
              "bg-lagunita-light": paragraph.cspCourseCardColor?.color === "009AB4",
              "bg-palo-verde": paragraph.cspCourseCardColor?.color === "279989",
            })}
          />
        )}

        {(paragraph.cspCourseCardFormat || paragraph.cspCourseCardLocation) && (
          <div className="mb-[.8rem] font-sans text-16 font-normal text-archway-light md:mb-[.9rem] 2xl:mb-4">
            {paragraph.cspCourseCardFormat}
            {paragraph.cspCourseCardFormat && paragraph.cspCourseCardLocation && (
              <span className="mx-6">&nbsp;|&nbsp;</span>
            )}
            {paragraph.cspCourseCardLocation}
          </div>
        )}

        {paragraph.cspCourseCardTitle && (
          <H2 className="rs-mb-1 type-1 mt-0">
            {url ? (
              <Link className="font-normal text-archway-dark hocus:text-digital-red" href={url}>
                {paragraph.cspCourseCardTitle}
              </Link>
            ) : (
              paragraph.cspCourseCardTitle
            )}
          </H2>
        )}

        {instructors.length > 0 && (
          <ul className="flex list-none flex-col gap-8 p-0">
            {instructors.map(instructor => (
              <li key={instructor.uuid}>
                <CourseCardInstructor instructor={instructor} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default FauxCourseCardParagraph
