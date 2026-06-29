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
          "rs-px-2 rs-mb-neg2 rs-py-neg2 mx-[3rem] gap-8 rounded-3xl border-2 pr-32 leading-none text-white xl:rs-pt-0 xl:rs-pb-2 xl:rs-py-2 xl:rs-px-2 md:mx-24 lg:mr-24 lg:max-w-[65rem] lg:justify-self-end xl:block xl:max-w-[24rem] xl:rounded-b-3xl xl:rounded-t-none xl:border-t-0 xl:text-left",
          bgClass,
          className
        )}
      >
        <div className="">
          {config.cspQaLabel && (
            <h2 className="xl-mb-0 mb-0 text-18 font-normal uppercase leading-none xl:leading-normal">
              {config.cspQaLabel}
            </h2>
          )}
          {config.cspQaText?.processed && (
            <Wysiwyg
              html={config.cspQaText.processed}
              className="[&_a]:text-white [&_a]:hocus:text-white [&_p]:font-semibold xl:[&_p]:!text-17"
            />
          )}
        </div>
      </div>
    </>
  )
}

export default QuarterAlert
