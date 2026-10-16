import Wysiwyg from "@components/elements/wysiwyg"
import {HtmlHTMLAttributes} from "react"
import {ParagraphStanfordWysiwyg} from "@lib/gql/__generated__/graphql"
import cn from "@lib/utils/className"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordWysiwyg
}

const WysiwygParagraph = ({paragraph, ...props}: Props) => {
  return (
    <Wysiwyg
      html={paragraph.suWysiwygText?.processed}
      className={cn("gutters max-w-980", props.className)}
      {...props}
    />
  )
}
export default WysiwygParagraph
