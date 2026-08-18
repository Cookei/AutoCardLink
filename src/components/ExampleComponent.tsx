import type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
  FilePath,
} from "@quartz-community/types";
import { classNames } from "../util/lang";
import style from "./styles/example.scss";
// @ts-expect-error - inline script import handled by Quartz bundler
import script from "./scripts/example.inline.ts";
import { slugifyFilePath } from "@quartz-community/utils";

export interface ExampleComponentOptions {
  prefix?: string;
  suffix?: string;
  className?: string;
  classNameImage?: string;
}

export default ((opts?: ExampleComponentOptions) => {
  const {
    prefix = "",
    suffix = "",
    className = "example-component",
    classNameImage = "example-component-image",
  } = opts ?? {};

  const Component: QuartzComponent = (props: QuartzComponentProps) => {
    const frontmatter = props.fileData?.frontmatter as { title?: string } | undefined;
    const title = frontmatter?.title ?? "Untitled";
    const fullText = `${prefix}${title}${suffix}`;
    const isLab = props.fileData?.frontmatter?.tags?.includes("lab");
    const image = props.fileData?.frontmatter?.image;
    let thumbnail: string | undefined;

    if (typeof image === "string") {
      const match = image.match(/\[\[(.*?)\]\]/);

      const captured = match?.[1];
      if (captured) {
        thumbnail = slugifyFilePath(captured as FilePath);
      }
    }
    return isLab ? (
      <img
        data-lightbox-ignore={true}
        class={classNames(classNameImage)}
        src={thumbnail}
        alt={title + " thumbnail"}
      />
    ) : (
      <div class={classNames(className)}>{fullText}</div>
    );
  };

  Component.css = style;
  Component.afterDOMLoaded = script;

  return Component;
}) satisfies QuartzComponentConstructor;
