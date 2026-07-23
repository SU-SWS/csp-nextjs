import React, {ElementType, HtmlHTMLAttributes} from "react"
import Image from "next/image"
import cn from "@lib/utils/className"
import {Maybe} from "@lib/gql/__generated__/graphql"
import {getImagePlaceholder} from "@lib/utils/get-image-placeholder"
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

const HeroBanner = async ({
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
        "rs-mb-5 relative mx-auto min-h-[400px] w-[calc(100%-0.8rem)] max-w-[160rem] overflow-hidden rounded-csp-lg @container @6xl:min-h-[600px]",
        {"bg-archway-dark": children},
        props.className
      )}
    >
      <div
        className={cn("w-full bg-cool-grey", {
          "@6xl:aspect-auto relative aspect-[16/9] @6xl:absolute @6xl:h-full": overlayPosition !== "center" && children,
          "aspect-auto absolute h-full": overlayPosition === "center" || !children,
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
          <Image
            className="object-cover"
            src={imageUrl}
            alt={imageAlt || ""}
            loading={eagerLoadImage ? "eager" : "lazy"}
            fill
            sizes="100vw"
            {...await getImagePlaceholder(imageUrl)}
          />
        )}
        {children && overlayPosition !== "center" && (
          <div
            className={cn(
              "absolute inset-0 z-10 bg-gradient-to-b from-transparent to-csp-archway-xdark/95 md:from-csp-archway-xdark/95 md:to-transparent",
              {
                "md:bg-gradient-to-l": overlayPosition === "right",
                "md:bg-gradient-to-r": overlayPosition !== "right",
              }
            )}
            aria-hidden="true"
          />
        )}
      </div>

      {children && (
        <div
          className={cn("relative z-[11] flex size-full flex-col gap-10", {
            "cc rs-py-4 items-center justify-center text-center text-white @6xl:max-w-800":
              overlayPosition === "center",
            "rs-p-2 @6xl:z-10 @6xl:my-24 @6xl:max-w-[900px] @6xl:bg-transparent": overlayPosition !== "center",
            "@6xl:ml-auto @6xl:mr-20": overlayPosition === "right",
            "@6xl:ml-20 @6xl:mr-auto": overlayPosition === "left",
          })}
        >
          {children}
        </div>
      )}
    </BannerWrapper>
  )
}
export default HeroBanner
