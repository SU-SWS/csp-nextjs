import OneColumn from "@components/paragraphs/rows/one-column"
import TwoColumn, {TwoColumnConfig} from "@components/paragraphs/rows/two-column"
import ThreeColumn from "@components/paragraphs/rows/three-column"
import {Maybe, ParagraphStanfordLayout, ParagraphUnion} from "@lib/gql/__generated__/graphql"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {LayoutParagraphBehaviors} from "drupal"
import {HTMLAttributes} from "react"
import cn from "@lib/utils/className"
import {ParagraphBehaviors} from "@lib/@types/drupal"

type Layout = Record<
  string,
  {
    item: ParagraphStanfordLayout
    layout: LayoutParagraphBehaviors["layout_paragraphs"]["layout"]
    config?: Record<string, unknown>
    children: ParagraphUnion[]
  }
>

type Props = HTMLAttributes<HTMLDivElement> & {
  components?: Maybe<ParagraphUnion[]>
  /**
   * Render background rows with square corners instead of rounded.
   */
  squareCorners?: boolean
}

const Rows = async ({components, squareCorners, className, ...props}: Props) => {
  if (!components) return
  const layouts: Layout = {}

  // Set the layouts first.
  components.map(item => {
    if (item.__typename === "ParagraphStanfordLayout") {
      const behaviors = getParagraphBehaviors<LayoutParagraphBehaviors>(item)

      layouts[item.uuid] = {
        item,
        layout: behaviors.layout_paragraphs?.layout || "layout_paragraphs_1_column",
        config: behaviors.layout_paragraphs?.config,
        children: [],
      }
    }
  })

  // Add the components to each of the layouts.
  components.map(item => {
    const behaviors = getParagraphBehaviors<ParagraphBehaviors>(item)
    const parentUUID = behaviors?.layout_paragraphs?.parent_uuid
    if (parentUUID && layouts[parentUUID]) {
      layouts[parentUUID].children.push(item)
    }
  })

  return (
    <div className={cn("@container", className)} {...props}>
      {Object.keys(layouts).map(layoutId => (
        <Row
          key={layoutId}
          layout={layouts[layoutId].layout}
          layoutSettings={layouts[layoutId].config}
          items={layouts[layoutId].children}
          squareCorners={squareCorners}
        />
      ))}
    </div>
  )
}

const Row = ({
  layout,
  layoutSettings,
  items,
  squareCorners,
}: {
  layout: LayoutParagraphBehaviors["layout_paragraphs"]["layout"]
  layoutSettings?: Record<string, unknown>
  items: ParagraphUnion[]
  squareCorners?: boolean
}) => {
  if (layout === "layout_paragraphs_2_column")
    return <TwoColumn config={layoutSettings as TwoColumnConfig} items={items} squareCorners={squareCorners} />
  if (layout === "layout_paragraphs_3_column")
    return <ThreeColumn config={layoutSettings} items={items} squareCorners={squareCorners} />

  // Fall back to one column if the layout is unknown.
  return <OneColumn config={layoutSettings} items={items} squareCorners={squareCorners} />
}

export default Rows
