import React, {ElementType, HtmlHTMLAttributes} from "react"
import cn from "@lib/utils/className"
import {Maybe} from "@lib/gql/__generated__/graphql"
import BlurImage from "@components/images/blur-image"
import {OverlayColors} from "@lib/@types/drupal"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  /**
   * Absolute image url path.
   */
  imageUrl?: Maybe<string>
  /**
   * Url of the image's `tiny_blur` style derivative, used to build the blur placeholder.
   */
  imageBlurUrl?: Maybe<string>
  /**
   * Image alt string.
   */
  imageAlt?: Maybe<string>
  /**
   * Is the banner supposed to be a section or a div.
   */
  isSection?: Maybe<boolean>
  /**
   * Eagerly load the banner image.
   */
  eagerLoadImage?: Maybe<boolean>
  /**
   * Position of the text over the image.
   */
  overlayPosition?: Maybe<"left" | "right" | "center">
  /**
   * Position of the text over the image.
   */
  overlayColor?: OverlayColors
}

const HeroBanner = ({
  imageUrl,
  imageBlurUrl,
  imageAlt,
  eagerLoadImage,
  isSection,
  overlayPosition,
  overlayColor,
  children,
  ...props
}: Props) => {
  const BannerWrapper: ElementType = isSection ? "section" : "div"

  return (
    <BannerWrapper
      {...props}
      className={cn(
        "@container relative mx-auto rs-mb-5 flex min-h-400 w-[calc(100%-0.8rem)] max-w-1600 flex-col justify-center overflow-hidden rounded-csp-lg @6xl:min-h-600",
        {"bg-archway-dark": children},
        props.className
      )}
    >
      <div
        className={cn("w-full bg-cool-grey", {
          "relative aspect-video @9xl:absolute @9xl:aspect-auto @9xl:h-full": overlayPosition !== "center" && children,
          "absolute aspect-auto h-full": overlayPosition === "center" || !children,
        })}
      >
        {overlayPosition === "center" && (
          <div
            className={cn("relative z-10 size-full", {
              "bg-black-true/80": !overlayColor || overlayColor === "#000000",
              "bg-plum/80": overlayColor === "#620059",
              "bg-sky-dark/80": overlayColor === "#016895",
              "bg-lagunita-dark/80": overlayColor === "#006B81",
              "bg-palo-alto/80": overlayColor === "#175E54",
              "bg-stone-dark/80": overlayColor === "#544948",
            })}
          />
        )}
        {imageUrl && (
          <BlurImage
            className="object-cover"
            src={imageUrl}
            blurSrc={imageBlurUrl}
            alt={imageAlt || ""}
            loading={eagerLoadImage ? "eager" : "lazy"}
            fill
            sizes="100vw"
          />
        )}
        {children && overlayPosition !== "center" && (
          <div
            // Only shown when the text overlays the image; stacked below it, the image has no gradient.
            className={cn(
              "absolute inset-0 z-10 hidden from-csp-archway-xdark/95 from-30% via-csp-archway-meddark/60 via-50% to-transparent to-75% @9xl:block",
              overlayPosition === "right" ? "bg-linear-to-l" : "bg-linear-to-r"
            )}
            aria-hidden="true"
          />
        )}
      </div>

      {children && (
        <div
          className={cn("relative z-11 flex flex-col gap-21", {
            "cc items-center justify-center rs-py-4 text-center text-white @6xl:max-w-800":
              overlayPosition === "center",
            "justify-center rs-p-2 @9xl:z-10 @9xl:max-w-9xl @9xl:bg-transparent": overlayPosition !== "center",
            "relative text-right @9xl:mr-40 @9xl:ml-auto @9xl:items-end": overlayPosition === "right",
            "@9xl:mr-auto @9xl:ml-40": overlayPosition === "left",
          })}
        >
          {children}
        </div>
      )}
    </BannerWrapper>
  )
}
export default HeroBanner
