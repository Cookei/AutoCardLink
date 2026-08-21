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
    type NotePropertiesData = {
      properties: Record<string, unknown>;
      hideView: boolean;
      showProperties?: boolean;
      collapseProperties?: boolean;
      resolvedLinks?: Record<string, string>;
    };

    const fileData = props.fileData as QuartzComponentProps["fileData"] & {
      noteProperties?: NotePropertiesData;
    };

    const frontmatter = fileData.frontmatter as
      | { title?: string; image?: string; tags?: string[] }
      | undefined;

    const title = frontmatter?.title ?? "Untitled";
    const fullText = `${prefix}${title}${suffix}`;
    const isLab = frontmatter?.tags?.includes("lab");

    const image = frontmatter?.image ?? "";
    const match = image.match(/^!?\[\[([^\]|#]+)(?:\|[^\]]+)?\]\]$/);
    const target = match?.[1]?.trim();

    const thumbnail = target
      ? (fileData.noteProperties?.resolvedLinks?.[target.toLowerCase()] ?? "")
      : "";

    return isLab ? (
      <div>
        <div class={classNames(className)}>{fullText}</div>
        <img
          data-lightbox-ignore={true}
          class={classNames(classNameImage)}
          src={thumbnail}
          alt={title + " thumbnail"}
        />
      </div>
    ) : props.fileData.toc ? (
      <div class={classNames(className)}>{fullText}</div>
    ) : (
      ""
    );
  };

  Component.css = style;
  Component.afterDOMLoaded = script;

  return Component;
}) satisfies QuartzComponentConstructor;
