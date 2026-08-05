import {HtmlHTMLAttributes} from "react"
import Image from "next/image"
import Link from "@components/elements/link"
import {H2, H3} from "@components/elements/headers"
import {ParagraphCspFauxCourseCard} from "@lib/gql/__generated__/graphql"
import CourseCardInstructor from "@components/paragraphs/csp-faux-course-card/course-card-instructor"
import cn from "@lib/utils/className"
import {getIdFromText} from "@lib/utils/text-tools"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphCspFauxCourseCard
}

const FauxCourseCardParagraph = ({paragraph, ...props}: Props) => {
  const image = paragraph.cspCourseCardImage?.mediaImage
  const url = paragraph.cspCourseCardLink?.url
  const headerTag = paragraph.cspCourseCardHeading || "h2"

  const id = headerTag !== "div" ? getIdFromText(paragraph.cspCourseCardTitle) : undefined

  return (
    <article
      {...props}
      aria-labelledby={id}
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
        {paragraph.cspCourseCardTitle && (
          <>
            {headerTag === "h2" && (
              <H2
                id={id}
                className="rs-mb-1 type-2 order-3 mt-0 font-normal [&_a]:text-archway-dark [&_a]:hocus:text-digital-red"
              >
                {url && (
                  <Link className="font-normal" href={url}>
                    {paragraph.cspCourseCardTitle}
                  </Link>
                )}
                {!url && paragraph.cspCourseCardTitle}
              </H2>
            )}
            {headerTag === "h3" && (
              <H3
                id={id}
                className="rs-mb-1 type-1 order-3 mt-0 font-normal [&_a]:text-archway-dark [&_a]:hocus:text-digital-red"
              >
                {url && (
                  <Link className="font-normal text-archway-dark hocus:text-digital-red" href={url}>
                    {paragraph.cspCourseCardTitle}
                  </Link>
                )}
                {!url && paragraph.cspCourseCardTitle}
              </H3>
            )}
            {headerTag === "div" && (
              <div className="rs-mb-1 type-1 order-3 mt-0 font-normal [&_a]:text-archway-dark [&_a]:hocus:text-digital-red">
                {paragraph.cspCourseCardTitle}
              </div>
            )}
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
              "bg-olive": paragraph.cspCourseCardColor?.color === "8f993e",
              "bg-archway-light": paragraph.cspCourseCardColor?.color === "766253",
              "bg-cardinal-red": paragraph.cspCourseCardColor?.color === "8c1515",
              "bg-plum": paragraph.cspCourseCardColor?.color === "81337a",
              "bg-lagunita-light": paragraph.cspCourseCardColor?.color === "009ab4",
              "bg-palo-verde": paragraph.cspCourseCardColor?.color === "279989",
            })}
          />
        )}
      </div>
    </article>
  )
}

export default FauxCourseCardParagraph
