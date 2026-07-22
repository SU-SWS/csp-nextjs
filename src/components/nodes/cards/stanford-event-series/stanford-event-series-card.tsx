import Link from "@components/elements/link"
import {H2, H3} from "@components/elements/headers"
import {HtmlHTMLAttributes} from "react"
import {NodeStanfordEventSeries} from "@lib/gql/__generated__/graphql"
import ImageCard from "@components/patterns/image-card"
import {getIdFromText} from "@lib/utils/text-tools"
import {ArrowRightIcon} from "@heroicons/react/20/solid"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordEventSeries
  headingLevel?: "h2" | "h3"
  isTeaser?: boolean
}

const StanfordEventSeriesCard = ({node, headingLevel, isTeaser, ...props}: Props) => {
  const Heading = headingLevel === "h3" ? H3 : H2
  const id = getIdFromText(node.title)
  return (
    <ImageCard {...props} aria-labelledby={id} isArticle>
      <Heading className="[&_a]:text-black [&_a]:hocus:text-digital-red" id={id}>
        <Link href={node.path || "#"}>{node.title}</Link>
        {isTeaser && <ArrowRightIcon height={25} className="ml-2 inline-block" />}
      </Heading>
      {node.suEventSeriesDek && <p>{node.suEventSeriesDek}</p>}
    </ImageCard>
  )
}
export default StanfordEventSeriesCard
