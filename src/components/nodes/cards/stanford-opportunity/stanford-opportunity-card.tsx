import Link from "@components/elements/link"
import {H2, H3} from "@components/elements/headers"
import {HtmlHTMLAttributes} from "react"
import {NodeStanfordOpportunity} from "@lib/gql/__generated__/graphql"
import ImageCard from "@components/patterns/image-card"
import Wysiwyg from "@components/elements/wysiwyg"
import ReverseVisualOrder from "@components/elements/reverse-visual-order"
import {getIdFromText} from "@lib/utils/text-tools"
import {ArrowRightIcon} from "@heroicons/react/20/solid"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordOpportunity
  headingLevel?: "h2" | "h3"
  isTeaser?: boolean
}

const StanfordOpportunityCard = ({node, headingLevel, isTeaser, ...props}: Props) => {
  const image = node.suOppImage?.mediaImage
  const Heading = headingLevel === "h3" ? H3 : H2
  const id = getIdFromText(node.title)
  return (
    <ImageCard {...props} aria-labelledby={id} imageUrl={image?.url} isArticle>
      <ReverseVisualOrder>
        <Heading className="[&_a]:text-black" id={id}>
          <Link className="flex" href={node.suOppSource?.url || node.path || "#"}>
            {node.title}
            {isTeaser && <ArrowRightIcon height={25} className="ml-2 self-center" />}
          </Link>
        </Heading>
        {node.suOppType && <div>{node.suOppType?.map(type => type.name).join(", ")}</div>}
      </ReverseVisualOrder>
      <Wysiwyg html={node.suOppSummary?.processed || node.body?.summary} />
      {node.suOppCardFooter && <Wysiwyg html={node.suOppCardFooter.processed} />}
      {node.suOppIcon && (
        <div className={`mr-10 text-right text-[50px] ${node.suOppIcon.style} fa-${node.suOppIcon.iconName}`} />
      )}
    </ImageCard>
  )
}
export default StanfordOpportunityCard
