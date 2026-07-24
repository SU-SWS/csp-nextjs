import {HtmlHTMLAttributes} from "react"
import Image from "next/image"
import Link from "@components/elements/link"
import {H3} from "@components/elements/headers"
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
        <div className="relative m-[.6rem] aspect-[54/29] w-full min-w-[56rem] flex-grow self-start overflow-hidden rounded-csp-sm">
          {url ? (
            <Link href={url} className="relative block h-full">
              <Image src={image.url} alt={image.alt || ""} fill className="border-transparent object-cover" />
            </Link>
          ) : (
            <Image src={image.url} alt={image.alt || ""} fill className="border object-cover" />
          )}
        </div>
      )}

      <div className="rs-pt-1 rs-pb-3 rs-px-3 min-w-0 max-w-600">
        {colorBar && <div className="rs-mb-1 h-[.4rem] w-[5rem] rounded" style={{backgroundColor: colorBar}} />}

        {(paragraph.cspCourseCardFormat || paragraph.cspCourseCardLocation) && (
          <div className="rs-mb-neg2 font-sans text-16 font-normal text-archway-light">
            {paragraph.cspCourseCardFormat}
            {paragraph.cspCourseCardFormat && paragraph.cspCourseCardLocation && <span className="mx-6">|</span>}
            {paragraph.cspCourseCardLocation}
          </div>
        )}

        {paragraph.cspCourseCardTitle && (
          <H3 className="rs-mb-1 type-1 mt-0">
            {url ? (
              <Link className="font-normal text-archway-dark hocus:text-digital-red" href={url}>
                {paragraph.cspCourseCardTitle}
              </Link>
            ) : (
              paragraph.cspCourseCardTitle
            )}
          </H3>
        )}

        {instructors.length > 0 && (
          <ul className="flex list-none flex-col gap-8 p-0">
            {instructors.map(instructor => (
              <CourseCardInstructor key={instructor.uuid} instructor={instructor} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default FauxCourseCardParagraph
