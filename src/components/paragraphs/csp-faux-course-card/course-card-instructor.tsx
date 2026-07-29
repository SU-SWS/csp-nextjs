import Image from "next/image"
import Link from "@components/elements/link"
import {H3} from "@components/elements/headers"
import {ParagraphCspFauxCourseCard} from "@lib/gql/__generated__/graphql"

/**
 * The element type of the card's instructors field.
 */
export type CourseCardInstructorItem = NonNullable<ParagraphCspFauxCourseCard["cspCourseCardInstructors"]>[number]

type Props = {
  instructor: CourseCardInstructorItem
  headingElement?: "h3" | "div"
}

/**
 * Stub rendering of a single Course Card instructor (name, title, headshot).
 */
const CourseCardInstructor = ({instructor, headingElement = "div"}: Props) => {
  const headshot = instructor.cspInstructorHeadshot?.mediaImage
  const HeadingElement = headingElement === "h3" ? H3 : "div"

  return (
    <div className="flex gap-8">
      {headshot?.url && (
        <div className="relative h-[5.7rem] w-[5.7rem] shrink-0">
          <Image
            className="rounded-full object-cover"
            src={headshot.url}
            alt={headshot.alt || ""}
            fill
            sizes="(max-width: 768px) 100px, 100px"
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        {instructor.cspInstructorUrl?.url && (
          <HeadingElement className="m-0 text-19 font-normal">
            <Link
              className="relative z-10 text-archway-dark no-underline hocus:text-digital-red hocus:underline"
              href={instructor.cspInstructorUrl.url}
            >
              {instructor.cspInstructorName}
            </Link>
          </HeadingElement>
        )}
        {!instructor.cspInstructorUrl?.url && (
          <HeadingElement className="m-0 text-19 font-normal text-archway-dark">
            {instructor.cspInstructorName}
          </HeadingElement>
        )}
        {instructor.cspInstructorTitle && (
          <div className="text-16 font-normal text-archway-light">
            <div>{instructor.cspInstructorTitle}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseCardInstructor
