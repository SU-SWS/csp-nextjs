import Wysiwyg from "@components/elements/wysiwyg"
import {CspQuarterAlert} from "@lib/gql/__generated__/graphql"
import {getConfigPage} from "@lib/gql/gql-queries"
import twMerge from "@lib/utils/twMerge"
import {clsx} from "clsx"
import {HTMLAttributes} from "react"

type Props = HTMLAttributes<HTMLDivElement>

const QuarterAlert = async ({className, ...props}: Props) => {
  const config = await getConfigPage<CspQuarterAlert>("CspQuarterAlert")
  if (!config?.cspQaEnabled) return

  return (
    <div
      className={twMerge(
        clsx(
          "rs-px-2 mx-[3rem] mb-[.9rem] gap-8 rounded-3xl border-2 py-[.9rem] pr-32 leading-none text-white xl:rs-pt-0 xl:rs-pb-1 xl:rs-px-1 md:mx-24 lg:mr-24 lg:justify-self-end xl:block xl:max-w-[24rem] xl:rounded-b-3xl xl:rounded-t-none xl:border-t-0 xl:text-left",
          {
            "bg-lagunita": !config.cspQaColor,
            "border-csp-lagunita-xdark bg-lagunita": config.cspQaColor === "lagunita",
            "border-cardinal-red-xdark bg-cardinal-red": config.cspQaColor === "cardinal",
            "border-plum-dark bg-plum": config.cspQaColor === "plum",
            "border-palo-alto-dark bg-palo-alto": config.cspQaColor === "palo-alto",
            "border-archway bg-archway-dark": config.cspQaColor === "black",
          },
          className
        )
      )}
      {...props}
    >
      <div className="flex flex-row items-center gap-8 xl:block">
        {config.cspQaLabel && (
          <h2 className="mb-0 text-18 font-normal uppercase leading-none xl:leading-normal">{config.cspQaLabel}</h2>
        )}
        {config.cspQaText?.processed && (
          <Wysiwyg
            html={config.cspQaText.processed}
            className="[&_*]:font-serif [&_a]:font-semibold [&_a]:text-white [&_a]:hocus:text-white [&_p]:text-18"
          />
        )}
      </div>
    </div>
  )
}

export default QuarterAlert
