import {HtmlHTMLAttributes} from "react"
import {ParagraphStanfordMediaCaption} from "@lib/gql/__generated__/graphql"
import BlurImage from "@components/images/blur-image"
import Oembed from "@components/elements/oembed"
import Link from "@components/elements/link"
import Wysiwyg from "@components/elements/wysiwyg"
import cn from "@lib/utils/className"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordMediaCaption
}

const MediaCaptionParagraph = ({paragraph, ...props}: Props) => {
  const image =
    paragraph.suMediaCaptionMedia?.__typename === "MediaImage" ? paragraph.suMediaCaptionMedia.mediaImage : undefined
  const videoUrl =
    paragraph.suMediaCaptionMedia?.__typename === "MediaVideo" && paragraph.suMediaCaptionMedia.mediaOembedVideo

  return (
    <figure {...props} className={cn("centered xl:max-w-1200", props.className)}>
      {image?.url && (
        <div className="relative aspect-video w-full">
          <BlurImage
            className="object-cover"
            src={image.url}
            alt={image.alt || ""}
            fill
            sizes="(max-width: 768px) 100vw, 1000px"
          />
        </div>
      )}
      {videoUrl && <Oembed url={videoUrl} />}

      <figcaption className="color text-left text-archway-light">
        {paragraph.suMediaCaptionLink?.url && (
          <Link href={paragraph.suMediaCaptionLink.url} className="text-16">
            {paragraph.suMediaCaptionLink.title}
          </Link>
        )}

        <Wysiwyg html={paragraph.suMediaCaptionCaption?.processed} className="[&_p]:text-16 [&_p]:leading-normal" />
      </figcaption>
    </figure>
  )
}
export default MediaCaptionParagraph
