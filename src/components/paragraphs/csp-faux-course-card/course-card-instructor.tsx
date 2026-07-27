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
    <div className="flex gap-8">
      {headshot?.url && (
        <div className="relative size-[5.7rem] shrink-0">
          <Image className="rounded-full object-cover" src={headshot.url} alt={headshot.alt || ""} fill />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="text-19 font-normal">
          {instructor.cspInstructorUrl?.url && (
            <Link
              className="font-normal text-archway-dark no-underline hocus:text-digital-red hocus:underline"
              href={instructor.cspInstructorUrl.url}
            >
              {instructor.cspInstructorName}
            </Link>
          )}
          {!instructor.cspInstructorUrl?.url && (
            <div className="text-19 font-normal text-archway-dark">{instructor.cspInstructorName}</div>
          )}
        </div>
        <div className="text-16 font-normal text-archway-light">
          {instructor.cspInstructorTitle && <div>{instructor.cspInstructorTitle}</div>}
        </div>
      </div>
    </div>
  )
}

export default CourseCardInstructor
