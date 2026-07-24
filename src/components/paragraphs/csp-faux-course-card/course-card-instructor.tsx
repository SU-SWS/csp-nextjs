import Image from "next/image"
import Link from "@components/elements/link"
import {ParagraphCspFauxCourseCard} from "@lib/gql/__generated__/graphql"

/**
 * The element type of the card's instructors field.
 */
export type CourseCardInstructorItem = NonNullable<ParagraphCspFauxCourseCard["cspCourseCardInstructors"]>[number]

type Props = {
  instructor: CourseCardInstructorItem
}

/**
 * Stub rendering of a single Course Card instructor (name, title, headshot).
 */
const CourseCardInstructor = ({instructor}: Props) => {
  const headshot = instructor.cspInstructorHeadshot?.mediaImage

  return (
    <li className="flex items-center gap-8">
      {headshot?.url && (
        <div className="relative h-[57px] w-[57px] shrink-0">
          <Image className="rounded-full object-cover" src={headshot.url} alt={headshot.alt || ""} fill sizes="57px" />
        </div>
      )}

      <div className="text-16 font-normal text-archway-light">
        <div className="text-19 font-normal text-archway-dark hocus:text-digital-red">
          {instructor.cspInstructorUrl?.url ? (
            <Link href={instructor.cspInstructorUrl.url}>{instructor.cspInstructorName}</Link>
          ) : (
            instructor.cspInstructorName
          )}
        </div>
        {instructor.cspInstructorTitle && <div>{instructor.cspInstructorTitle}</div>}
      </div>
    </li>
  )
}

export default CourseCardInstructor
