import SiteSearchForm from "@components/search/site-search-form"
import MainMenu from "@components/menu/main-menu"
import GlobalMessage from "@components/config-pages/global-message"
import Lockup from "@components/elements/lockup/lockup"
import {HTMLAttributes} from "react"
import twMerge from "@lib/utils/twMerge"
import UtilityNav from "@components/menu/utility-nav"
import {getConfigPageField} from "@lib/gql/gql-queries"
import {StanfordBasicSiteSetting} from "@lib/gql/__generated__/graphql"
import Link from "@components/elements/link"

type Props = HTMLAttributes<HTMLElement>

const PageHeader = async ({...props}: Props) => {
  const headerButton = await getConfigPageField<
    StanfordBasicSiteSetting,
    StanfordBasicSiteSetting["suSiteHeaderButton"]
  >("StanfordBasicSiteSetting", "suSiteHeaderButton")

  return (
    <header {...props} className={twMerge("", props.className)}>
      <div className="bg-cardinal-red">
        <div className="centered flex items-center justify-between py-3">
          <Link
            prefetch={false}
            className="font-stanford text-20 font-regular leading-none text-white no-underline hocus:text-white hocus:underline"
            href="https://www.stanford.edu"
          >
            Stanford University
          </Link>

          {headerButton?.url && (
            <Link
              className="text-white no-underline hocus:text-white hocus:underline lg:hidden"
              href={headerButton.url}
            >
              {headerButton.title}
            </Link>
          )}
        </div>
      </div>
      <GlobalMessage />
      <div className="relative mx-auto max-w-[150rem]">
        <div className="min-h-50 centered pr-32 md:pr-24 lg:pr-0">
          <div className="flex w-full items-center justify-between">
            <Lockup />
            <div className="flex items-center justify-end gap-6">
              <UtilityNav />
              <SiteSearchForm className="hidden lg:hidden" />
              {/* This needs to be replaced with the BE work */}
              <div className="rs-pt-0 rs-pb-2 rs-px-2 max-w-[24rem] rounded-b-3xl border-lagunita bg-lagunita text-left text-14 font-normal leading-none text-white">
                <h2 className="text-18 font-normal uppercase">Winter Quarter</h2>
                <p className="text-17">Winter courses are open for enrollment until February 9th.</p>
              </div>
            </div>
          </div>
        </div>
        <MainMenu />
      </div>
    </header>
  )
}
export default PageHeader
