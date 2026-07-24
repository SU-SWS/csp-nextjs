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
    <div {...props} className={cn("flex flex-wrap gap-24", props.className)}>
      {image?.url && (
        <div className="relative aspect-[260/180] w-[260px] max-w-full shrink-0">
          {url ? (
            <Link href={url} className="relative block h-full w-full">
              <Image src={image.url} alt={image.alt || ""} fill sizes="260px" className="object-cover" />
            </Link>
          ) : (
            <Image src={image.url} alt={image.alt || ""} fill sizes="260px" className="object-cover" />
          )}
        </div>
      )}

      <div className="min-w-0 flex-1">
        {colorBar && <div className="mb-16 h-4 w-[50px] rounded" style={{backgroundColor: colorBar}} />}

        {(paragraph.cspCourseCardFormat || paragraph.cspCourseCardLocation) && (
          <div className="mb-8 text-16">
            {paragraph.cspCourseCardFormat}
            {paragraph.cspCourseCardFormat && paragraph.cspCourseCardLocation && <span className="mx-6">|</span>}
            {paragraph.cspCourseCardLocation}
          </div>
        )}

        <H3 className="mb-16">
          {url ? <Link href={url}>{paragraph.cspCourseCardTitle}</Link> : paragraph.cspCourseCardTitle}
        </H3>

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
