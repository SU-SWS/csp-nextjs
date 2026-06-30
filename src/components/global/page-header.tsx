import SiteSearchForm from "@components/search/site-search-form"
import MainMenu from "@components/menu/main-menu"
import GlobalMessage from "@components/config-pages/global-message"
import QuarterAlert from "@components/config-pages/quarter-alert"
import Lockup from "@components/elements/lockup/lockup"
import {HTMLAttributes} from "react"
import twMerge from "@lib/utils/twMerge"
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
    <header {...props} className={twMerge("", props.className)}>
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
      <div className="relative mx-auto max-w-[150rem]">
        <div className="min-h-50 centered pr-32 md:pr-24 lg:pr-0">
          <div className="flex w-full items-center justify-between">
            <Lockup />
            <div className="flex items-center justify-end gap-6 md:mr-20 lg:mr-0">
              <UtilityNav />
              {/* TODO: className was `hidden lg:block` in 1.x — review once Winter Quarter banner is replaced with BE work */}
              {!hideSearch && <SiteSearchForm className="hidden lg:hidden" />}
              <QuarterAlert className="hidden xl:block" />
            </div>
          </div>
          <MainMenu hideSearch={hideSearch} />
          {/* This needs to be replaced with the BE work. This only appears ≥1280px */}
          <QuarterAlert className="flex flex-row xl:hidden" />
        </div>
      </div>
    </header>
  )
}

export default PageHeader
