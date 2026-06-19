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
  const headerButton = await getConfigPageField<(typeof StanfordBasicSiteSetting)["suSiteHeaderButton"]>(
    "StanfordBasicSiteSetting",
    "suSiteHeaderButton"
  )
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
            <div className="flex items-center justify-end gap-6 md:mr-20 lg:mr-0">
              <UtilityNav />
              {/* TODO: className was `hidden lg:block` in 1.x — review once Winter Quarter banner is replaced with BE work */}
              {!hideSearch && <SiteSearchForm className="hidden lg:hidden" />}
              {/* This needs to be replaced with the BE work. This only appears <1280px */}
              <div className="rs-pt-0 rs-pb-2 rs-px-2 hidden max-w-[24rem] rounded-b-3xl border-2 border-t-0 border-csp-lagunita-xdark bg-lagunita text-left text-14 font-normal leading-none text-white xl:block">
                <h2 className="text-18 font-normal uppercase">Winter Quarter</h2>
                <p className="text-17">Winter courses are open for enrollment until February 9th.</p>
              </div>
            </div>
          </div>
        </div>
        <MainMenu hideSearch={hideSearch} />
        {/* This needs to be replaced with the BE work. This only appears ≥1280px */}
        <div className="rs-px-2 rs-mb-neg2 rs-py-neg2 mx-[3rem] flex flex-col gap-8 rounded-3xl border-2 border-csp-lagunita-xdark bg-lagunita pr-32 text-white md:mx-24 md:flex-row lg:mr-24 lg:max-w-[65rem] lg:justify-self-end xl:hidden">
          <h2 className="mb-0 text-18 font-normal uppercase leading-none">Winter Quarter</h2>
          <p className="mb-0 text-16 font-semibold leading-none">
            Winter courses are open for enrollment until February 9th.
          </p>
        </div>
      </div>
    </header>
  )
}

export default PageHeader
