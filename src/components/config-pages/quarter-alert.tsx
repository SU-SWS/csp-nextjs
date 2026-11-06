import Wysiwyg from "@components/elements/wysiwyg"
import {CspQuarterAlert} from "@lib/gql/__generated__/graphql"
import {getConfigPage} from "@lib/gql/gql-queries"
import {HTMLAttributes} from "react"
import cn from "@lib/utils/className"

type Props = HTMLAttributes<HTMLDivElement>

const QuarterAlert = async ({className, ...props}: Props) => {
  const config = await getConfigPage<CspQuarterAlert>("CspQuarterAlert")
  if (!config?.cspQaEnabled) return

  return (
    <div
      className={cn(
        "mb-9 gap-20 rounded-3xl border-2 py-9 rs-px-2 pr-80 leading-none text-white lg:justify-self-end xl:block xl:max-w-sm xl:rounded-t-none xl:rounded-b-3xl xl:border-t-0 xl:rs-pt-0 xl:rs-px-1 xl:rs-pb-1 xl:text-left",
        {
          "bg-lagunita": !config.cspQaColor,
          "border-csp-lagunita-xdark bg-lagunita": config.cspQaColor === "lagunita",
          "border-cardinal-red-xdark bg-cardinal-red": config.cspQaColor === "cardinal",
          "border-plum-dark bg-plum": config.cspQaColor === "plum",
          "border-palo-alto-dark bg-palo-alto": config.cspQaColor === "palo-alto",
          "border-archway bg-archway-dark": config.cspQaColor === "black",
        },
        className
      )}
      {...props}
    >
      <div className="flex flex-row items-center gap-20 xl:block">
        {config.cspQaLabel && (
          <h2 className="mb-0 text-18 leading-none font-normal uppercase xl:leading-normal">{config.cspQaLabel}</h2>
        )}
        {config.cspQaText?.processed && (
          <Wysiwyg
            html={config.cspQaText.processed}
            className={cn(
              "**:font-serif [&_a]:font-semibold [&_a]:text-white [&_a]:hocus:text-white [&_p]:text-18 [&_p]:leading-normal",
              {
                "[&_a]:hocus:text-lagunita-40": config.cspQaColor === "lagunita",
                "[&_a]:hocus:text-csp-peach": config.cspQaColor === "cardinal" || config.cspQaColor === "black",
                "[&_a]:hocus:text-csp-plum-xlight": config.cspQaColor === "plum",
                "[&_a]:hocus:text-csp-palo-alto-50": config.cspQaColor === "palo-alto",
              }
            )}
          />
        )}
      </div>
    </div>
  )
}

export default QuarterAlert
