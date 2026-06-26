import Wysiwyg from "@components/elements/wysiwyg"
import {CspQuarterAlert} from "@lib/gql/__generated__/graphql"
import {getConfigPage} from "@lib/gql/gql-queries"
import twMerge from "@lib/utils/twMerge"

const colorBgMap: Record<string, string> = {
  lagunita: "bg-lagunita",
  cardinal: "bg-cardinal-red",
  plum: "bg-plum",
  "palo-alto": "bg-palo-alto",
  black: "bg-black",
}

const QuarterAlert = async () => {
  const config = await getConfigPage<CspQuarterAlert>("CspQuarterAlert")
  if (!config?.cspQaEnabled) return

  const bgClass = config.cspQaColor ? (colorBgMap[config.cspQaColor] ?? "bg-lagunita") : "bg-lagunita"

  return (
    <div className={twMerge("py-5 text-white", bgClass)}>
      <div className="centered flex flex-col gap-3 sm:flex-row sm:items-center">
        {config.cspQaLabel && <div className="shrink-0 font-bold uppercase tracking-wider">{config.cspQaLabel}</div>}
        {config.cspQaText?.processed && (
          <Wysiwyg html={config.cspQaText.processed} className="[&_a]:text-white [&_a]:hocus:text-white" />
        )}
      </div>
    </div>
  )
}

export default QuarterAlert
