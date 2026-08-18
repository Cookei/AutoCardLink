import { createRequire } from 'module';

createRequire(import.meta.url);

// node_modules/@quartz-community/utils/dist/lang.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/styles/example.scss
var example_default = ".example-component {\n  padding: 8px 16px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border-radius: 4px;\n  font-weight: 600;\n  display: inline-block;\n}\n\n.example-component-image {\n  object-fit: cover;\n}";

// src/components/scripts/example.inline.ts
var example_inline_default = 'function o(){let e=window.location.pathname;return e.startsWith("/")&&(e=e.slice(1)),e.endsWith("/")&&(e=e.slice(0,-1)),e||"index"}function n(){let e=document.querySelectorAll(".example-component");e.length!==0&&console.log("[ExampleComponent] Initialized with",e.length,"component(s)")}document.addEventListener("nav",e=>{let t=e.detail?.url||o();console.log("[ExampleComponent] Navigation to:",t),n()});document.addEventListener("render",()=>{console.log("[ExampleComponent] Render event - re-initializing"),n()});document.addEventListener("prenav",()=>{let e=document.querySelector(".example-component");e&&sessionStorage.setItem("exampleScrollTop",e.scrollTop?.toString()||"0")});\n';
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, o2, r2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((o2 = i2.constructor) && null != o2.getDerivedStateFromError && (i2.setState(o2.getDerivedStateFromError(n2)), r2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), r2 = i2.__d), r2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// node_modules/@quartz-community/utils/dist/index.js
function slugifyFilePath(fp, excludeExt) {
  fp = stripSlashes(fp);
  const ext = getFileExtension(fp);
  const withoutFileExt = fp.replace(new RegExp(ext + "$"), "");
  const finalExt = [".md", ".html", void 0].includes(ext) ? "" : ext;
  let slug2 = _sluggify(withoutFileExt);
  if (endsWith(slug2, "_index")) {
    slug2 = slug2.replace(/_index$/, "index");
  }
  const segments = slug2.split("/");
  if (segments.length >= 2 && segments[segments.length - 1] === segments[segments.length - 2]) {
    segments[segments.length - 1] = "index";
    slug2 = segments.join("/");
  }
  return slug2 + (finalExt ?? "");
}
function endsWith(s2, suffix) {
  return s2 === suffix || s2.endsWith("/" + suffix);
}
function stripSlashes(s2, onlyStripPrefix) {
  if (s2.startsWith("/")) {
    s2 = s2.substring(1);
  }
  if (s2.endsWith("/")) {
    s2 = s2.slice(0, -1);
  }
  return s2;
}
function getFileExtension(s2) {
  return s2.match(/\.[A-Za-z0-9]+$/)?.[0];
}
function slugifyPath(s2) {
  return s2.split("/").map(
    (segment) => segment.replace(/\s/g, "-").replace(/&/g, "-and-").replace(/%/g, "-percent").replace(/\?/g, "").replace(/#/g, "").replace(/[<>:"|*]/g, "").toLowerCase()
  ).join("/").replace(/\/$/, "");
}
function _sluggify(s2) {
  return slugifyPath(s2);
}

// src/components/ExampleComponent.tsx
var ExampleComponent_default = ((opts) => {
  const {
    prefix = "",
    suffix = "",
    className = "example-component",
    classNameImage = "example-component-image"
  } = opts ?? {};
  const Component = (props) => {
    const frontmatter = props.fileData?.frontmatter;
    const title = frontmatter?.title ?? "Untitled";
    const fullText = `${prefix}${title}${suffix}`;
    const isLab = props.fileData?.frontmatter?.tags?.includes("lab");
    const image = props.fileData?.frontmatter?.image;
    let thumbnail;
    if (typeof image === "string") {
      const match = image.match(/\[\[(.*?)\]\]/);
      const captured = match?.[1];
      if (captured) {
        thumbnail = slugifyFilePath(captured);
      }
    }
    return isLab ? /* @__PURE__ */ u2(
      "img",
      {
        "data-lightbox-ignore": true,
        class: classNames(classNameImage),
        src: thumbnail,
        alt: title + " thumbnail"
      }
    ) : /* @__PURE__ */ u2("div", { class: classNames(className), children: fullText });
  };
  Component.css = example_default;
  Component.afterDOMLoaded = example_inline_default;
  return Component;
});

export { ExampleComponent_default as ExampleComponent };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map