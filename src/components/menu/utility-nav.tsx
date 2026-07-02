import {getConfigPageField} from "@lib/gql/gql-queries"
import {Maybe, StanfordBasicSiteSetting} from "@lib/gql/__generated__/graphql"
import Button from "@components/elements/button"
import Link from "@components/elements/link"
import {UserIcon, ShoppingCartIcon} from "@heroicons/react/20/solid"

const UtilityNav = async () => {
  const headerButton = await getConfigPageField<
    StanfordBasicSiteSetting,
    StanfordBasicSiteSetting["suSiteHeaderButton"]
  >("StanfordBasicSiteSetting", "suSiteHeaderButton")

  const headerLinks = await getConfigPageField<StanfordBasicSiteSetting, StanfordBasicSiteSetting["suSiteHeaderLinks"]>(
    "StanfordBasicSiteSetting",
    "suSiteHeaderLinks"
  )
  if (!headerButton && !headerLinks) return

  return (
    <nav aria-label="Site utility navigation" className="mt-5 block">
      <ul className="list-unstyled flex items-center gap-10">
        {headerLinks?.map((link, i) => (
          <li key={`utility-link-${i}`} className="mb-0">
            <Link
              className="text-17 font-normal text-archway-light no-underline hocus:underline [&_svg]:hocus:text-digital-red"
              href={link.url || "#"}
            >
              {link.title}
              <LinkIcon url={link.url || "#"} title={link.title} />
            </Link>
          </li>
        ))}

        {headerButton?.url && (
          <li className="mb-0">
            <Button href={headerButton.url}>{headerButton.title}</Button>
          </li>
        )}
      </ul>
    </nav>
  )
}

const LinkIcon = ({url, title}: {url: string; title?: Maybe<string>}) => {
  const isCart = url?.includes("cart") || title?.toLowerCase().includes("cart")
  if (isCart) return <ShoppingCartIcon width={16} className="ml-2 inline text-stone-dark" />
  return <UserIcon width={16} className="ml-2 inline text-stone-dark" />
}
export default UtilityNav
