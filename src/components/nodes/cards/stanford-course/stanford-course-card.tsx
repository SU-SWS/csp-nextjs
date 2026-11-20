import Link from "@components/elements/link"
import {H2, H3} from "@components/elements/headers"
import {HtmlHTMLAttributes} from "react"
import {NodeStanfordCourse} from "@lib/gql/__generated__/graphql"
import {getCspProductHref} from "@lib/utils/csp-product"
import ImageCard from "@components/patterns/image-card"
import ReverseVisualOrder from "@components/elements/reverse-visual-order"
import {convertHtml} from "@components/elements/wysiwyg"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordCourse
  headingLevel?: "h2" | "h3"
}

const StanfordCourseCard = ({node, headingLevel, ...props}: Props) => {
  const Heading = headingLevel === "h3" ? H3 : H2
  const productHref = getCspProductHref(node.suCourseLink?.url)
  return (
    <ImageCard {...props} aria-label={node.title} isArticle>
      <ReverseVisualOrder>
        <Heading>
          {/* A plain anchor: the storefront is proxied from Salesforce, so client side routing can't render it. */}
          {productHref ? (
            <a href={productHref}>{convertHtml(node.title)}</a>
          ) : (
            <Link href={node.path}>{convertHtml(node.title)}</Link>
          )}
        </Heading>

        <div className="flex items-center gap-10">
          {node.suCourseSubject && (
            <div className="font-bold">
              {node.suCourseSubject.name}
              {node.suCourseCode}
            </div>
          )}
          {node.suCourseSubject && node.suCourseAcademicYear && <> | </>}
          <div>{node.suCourseAcademicYear}</div>
        </div>
      </ReverseVisualOrder>
    </ImageCard>
  )
}
export default StanfordCourseCard
