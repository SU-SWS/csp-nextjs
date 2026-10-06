import cn from "@lib/utils/className"
import Image from "next/image"
import Oembed from "@components/elements/oembed"
import {ElementType, HTMLAttributes} from "react"
import {Maybe} from "@lib/gql/__generated__/graphql"

type Props = HTMLAttributes<HTMLElement | HTMLDivElement> & {
  /**
   * Absolute image url path.
   */
  imageUrl?: Maybe<string>
  /**
   * Image alt string.
   */
  imageAlt?: Maybe<string>
  /**
   * Absolute url for the video, typically an oembed url.
   */
  videoUrl?: Maybe<string>
  /**
   * If the wrapper should be an article or a div, use an article if an appropriate heading is within the card.
   */
  isArticle?: Maybe<boolean>
  /**
   * If the image aspect ratio should be 1:1 instead of 16:9
   */
  squareImage?: Maybe<boolean>
  /**
   * Card variant: default or poster
   */
  variant?: "default" | "poster"
  /**
   * Background color for poster variant (hex color code)
   */
  bgColor?: Maybe<ImageCardBgColor>
}

export type ImageCardBgColor = "2e2d29" | "8c1515" | "620059" | "007c92" | "175e54" | "f4f4f4"

const ImageCard = ({
  imageUrl,
  imageAlt,
  videoUrl,
  isArticle,
  squareImage,
  variant,
  bgColor,
  children,
  ...props
}: Props) => {
  const CardWrapper: ElementType = isArticle ? "article" : "div"
  const isPoster = variant === "poster"

  return (
    <CardWrapper
      {...props}
      className={cn(
        "relative centered h-full w-full rounded-csp-lg border xl:max-w-[980px]",
        {"flex flex-col gap-[.6rem] border-none @bp-768:flex-row": isPoster},
        props.className
      )}
    >
      {imageUrl && (
        <div
          className={cn("relative w-full border-transparent", {
            "aspect-square": squareImage,
            "aspect-[16/9]": !squareImage,
            "aspect-[3/2] flex-1 md:aspect-[16/9]": isPoster,
          })}
        >
          <Image
            className={cn("rounded-t-csp-lg object-cover object-center", {"rounded-csp-md": isPoster})}
            src={imageUrl}
            alt={imageAlt || ""}
            fill
            sizes="(max-width: 768px) 100vw, 1000px"
          />
        </div>
      )}

      {videoUrl && <Oembed url={videoUrl} />}

      <div
        className={cn("flex flex-col rs-pt-2 rs-pr-3 rs-pb-3 rs-pl-2", {
          "rounded-b-csp-lg bg-csp-cream": !isPoster,
          "flex-1 gap-[.6rem] rounded-csp-md": isPoster,
          "bg-archway-dark": isPoster && bgColor === "2e2d29",
          "bg-cardinal-red": isPoster && bgColor === "8c1515",
          "bg-plum": isPoster && bgColor === "620059",
          "bg-lagunita": isPoster && bgColor === "007c92",
          "bg-palo-alto": isPoster && bgColor === "175e54",
          "bg-fog-light text-archway-dark": isPoster && bgColor === "f4f4f4",
          "[&>div]:text-archway-dark": isPoster && !bgColor,
        })}
      >
        {children}
      </div>
    </CardWrapper>
  )
}

export default ImageCard
