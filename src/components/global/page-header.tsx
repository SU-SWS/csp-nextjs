import SiteSearchForm from "@components/search/site-search-form"
import MainMenu from "@components/menu/main-menu"
import GlobalMessage from "@components/config-pages/global-message"
import QuarterAlert from "@components/config-pages/quarter-alert"
import Lockup from "@components/elements/lockup/lockup"
import {HTMLAttributes} from "react"
import UtilityNav from "@components/menu/utility-nav"
import {getConfigPageField} from "@lib/gql/gql-queries"
import {StanfordBasicSiteSetting} from "@lib/gql/__generated__/graphql"
import Link from "@components/elements/link"

type Props = HTMLAttributes<HTMLElement>

const PageHeader = async ({...props}: Props) => {
  const hideSearch =
    (await getConfigPageField<StanfordBasicSiteSetting, StanfordBasicSiteSetting["suHideSiteSearch"]>(
      "StanfordBasicSiteSetting",
      "suHideSiteSearch"
    )) === true

  return (
    <header {...props}>
      <div className="bg-cardinal-red">
        <div className="centered flex items-center justify-between py-3">
          <Link
            className="logo font-stanford text-20 font-regular leading-none text-white no-underline hocus:text-white"
            href="https://www.stanford.edu"
          >
            Stanford University
          </Link>
        </div>
      </div>
      <GlobalMessage />
      <div className="relative">
        <div className="min-h-50 centered pr-0 sm:pr-24 md:pr-28 lg:pr-0">
          <div className="mb-8 flex w-full flex-col justify-between pr-8 sm:mb-0 sm:flex-row sm:items-center md:pr-0">
            <Lockup />
            <div className="flex items-center justify-end gap-6 pr-32 sm:justify-center sm:pr-0 md:mr-20 lg:mr-0">
              <UtilityNav />
              {!hideSearch && <SiteSearchForm className="hidden lg:hidden" />}
              <QuarterAlert className="hidden xl:block" />
            </div>
          </div>
          <MainMenu hideSearch={hideSearch} />
        </div>
      </div>
    </header>
  )
}

export default PageHeader
