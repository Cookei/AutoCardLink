import type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
} from "@quartz-community/types";
import { classNames } from "../util/lang";
import style from "./styles/example.scss";
// @ts-expect-error - inline script import handled by Quartz bundler
import script from "./scripts/example.inline.ts";

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
    const frontmatter = props.fileData?.frontmatter as
      | {
          title?: string;
          image?: string | undefined;
          socialImage?: string | undefined;
          tags?: string[];
        }
      | undefined;
    const title = frontmatter?.title ?? "Untitled";
    const fullText = `${prefix}${title}${suffix}`;
    const isLab = frontmatter?.tags?.includes("lab") ?? false;
    const thumbnail: string | undefined =
      (frontmatter?.image as string | undefined) ??
      (frontmatter?.socialImage as string | undefined);

    return isLab ? (
      <img
        data-lightbox-ignore={true}
        src={thumbnail}
        class={classNames(classNameImage)}
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
