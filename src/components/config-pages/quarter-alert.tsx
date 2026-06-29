import Wysiwyg from "@components/elements/wysiwyg"
import {CspQuarterAlert} from "@lib/gql/__generated__/graphql"
import {getConfigPage} from "@lib/gql/gql-queries"
import twMerge from "@lib/utils/twMerge"

const colorBgMap: Record<string, string> = {
  lagunita: "bg-lagunita border-csp-lagunita-xdark",
  cardinal: "bg-cardinal-red border-cardinal-red-xdark",
  plum: "bg-plum border-plum-dark",
  "palo-alto": "bg-palo-alto border-palo-alto-dark",
  black: "bg-archway-dark border-archway",
}

type Props = {
  className?: string
}

const QuarterAlert = async ({className}: Props) => {
  const config = await getConfigPage<CspQuarterAlert>("CspQuarterAlert")
  if (!config?.cspQaEnabled) return

  const bgClass = config.cspQaColor ? (colorBgMap[config.cspQaColor] ?? "bg-lagunita") : "bg-lagunita"

  return (
    <>
      <div
        className={twMerge(
          "rs-px-2 mx-[3rem] mb-[.9rem] gap-8 rounded-3xl border-2 py-[.9rem] pr-32 leading-none text-white xl:rs-pt-0 xl:rs-pb-2 xl:rs-py-2 xl:rs-px-2 md:mx-24 lg:mr-24 lg:max-w-[65rem] lg:justify-self-end xl:block xl:max-w-[24rem] xl:rounded-b-3xl xl:rounded-t-none xl:border-t-0 xl:text-left",
          bgClass,
          className
        )}
      >
        <div className="">
          {config.cspQaLabel && (
            <h2 className="xl-mb-0 type-0 mb-0 font-normal uppercase leading-none xl:leading-normal">
              {config.cspQaLabel}
            </h2>
          )}
          {config.cspQaText?.processed && (
            <Wysiwyg
              html={config.cspQaText.processed}
              className="[&_*]:font-serif [&_a]:font-semibold [&_a]:text-white [&_a]:hocus:text-white [&_p]:text-18"
            />
          )}
        </div>
      </div>
    </>
  )
}

export default QuarterAlert
