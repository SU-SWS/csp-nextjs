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
        "@container relative mx-auto rs-mb-5 min-h-[400px] w-[calc(100%-0.8rem)] max-w-[210rem] overflow-hidden rounded-csp-lg @6xl:min-h-[600px]",
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
            alt={imageAlt || ""}
            loading={eagerLoadImage ? "eager" : "lazy"}
            fill
            sizes="100vw"
          />
        )}
        {children && overlayPosition !== "center" && (
          <div
            className={cn(
              "@xl: absolute inset-0 z-10 bg-linear-to-b from-transparent via-csp-archway-meddark/60 via-50% to-csp-archway-xdark/95 to-75% @2xl:from-60% @4xl:from-50% @9xl:to-transparent",
              overlayPosition === "right"
                ? "@9xl:bg-linear-to-l @9xl:from-csp-archway-xdark/95 @9xl:from-30%"
                : "@9xl:bg-linear-to-r @9xl:from-csp-archway-xdark/95 @9xl:from-30%"
            )}
            aria-hidden="true"
          />
        )}
      </div>

      {children && (
        <div
          className={cn("relative z-11 flex size-full flex-col gap-[1.75rem]", {
            "cc items-center justify-center rs-py-4 text-center text-white @6xl:max-w-800":
              overlayPosition === "center",
            "rs-p-2 @6xl:my-60 @9xl:z-10 @9xl:max-w-[90rem] @9xl:bg-transparent": overlayPosition !== "center",
            "@9xl:mr-40 @9xl:ml-auto": overlayPosition === "right",
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
