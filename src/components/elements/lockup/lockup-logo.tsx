import {Maybe} from "@lib/gql/__generated__/graphql"
import StanfordWordMark from "@components/images/stanford-wordmark"

const LockupLogo = ({logoUrl, siteName = ""}: {logoUrl?: Maybe<string>; siteName?: Maybe<string>}) => {
  return (
    <>
      {logoUrl && (
        <picture>
          <img src={logoUrl} alt={`${siteName} Logo`} className="h-auto max-h-[35px] max-w-[400px] object-contain" />
        </picture>
      )}
      {!logoUrl && (
        <StanfordWordMark className="block max-h-[20px] w-auto text-cardinal-red no-underline md:max-h-[30px]" />
      )}
    </>
  )
}

export default LockupLogo
