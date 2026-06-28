import { createRequire } from 'module';

createRequire(import.meta.url);

// node_modules/unist-util-is/lib/index.js
var convert = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  (function(test) {
    if (test === null || test === void 0) {
      return ok;
    }
    if (typeof test === "function") {
      return castFactory(test);
    }
    if (typeof test === "object") {
      return Array.isArray(test) ? anyFactory(test) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        propertiesFactory(
          /** @type {Props} */
          test
        )
      );
    }
    if (typeof test === "string") {
      return typeFactory(test);
    }
    throw new Error("Expected function, string, or object as test");
  })
);
function anyFactory(tests) {
  const checks = [];
  let index = -1;
  while (++index < tests.length) {
    checks[index] = convert(tests[index]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index2 = -1;
    while (++index2 < checks.length) {
      if (checks[index2].apply(this, parameters)) return true;
    }
    return false;
  }
}
function propertiesFactory(check) {
  const checkAsRecord = (
    /** @type {Record<string, unknown>} */
    check
  );
  return castFactory(all);
  function all(node) {
    const nodeAsRecord = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      node
    );
    let key;
    for (key in check) {
      if (nodeAsRecord[key] !== checkAsRecord[key]) return false;
    }
    return true;
  }
}
function typeFactory(check) {
  return castFactory(type);
  function type(node) {
    return node && node.type === check;
  }
}
function castFactory(testFunction) {
  return check;
  function check(value, index, parent) {
    return Boolean(
      looksLikeANode(value) && testFunction.call(
        this,
        value,
        typeof index === "number" ? index : void 0,
        parent || void 0
      )
    );
  }
}
function ok() {
  return true;
}
function looksLikeANode(value) {
  return value !== null && typeof value === "object" && "type" in value;
}

// node_modules/unist-util-visit-parents/lib/color.node.js
function color(d) {
  return "\x1B[33m" + d + "\x1B[39m";
}

// node_modules/unist-util-visit-parents/lib/index.js
var empty = [];
var CONTINUE = true;
var EXIT = false;
var SKIP = "skip";
function visitParents(tree, test, visitor, reverse) {
  let check;
  if (typeof test === "function" && typeof visitor !== "function") {
    reverse = visitor;
    visitor = test;
  } else {
    check = test;
  }
  const is2 = convert(check);
  const step = reverse ? -1 : 1;
  factory(tree, void 0, [])();
  function factory(node, index, parents) {
    const value = (
      /** @type {Record<string, unknown>} */
      node && typeof node === "object" ? node : {}
    );
    if (typeof value.type === "string") {
      const name = (
        // `hast`
        typeof value.tagName === "string" ? value.tagName : (
          // `xast`
          typeof value.name === "string" ? value.name : void 0
        )
      );
      Object.defineProperty(visit2, "name", {
        value: "node (" + color(node.type + (name ? "<" + name + ">" : "")) + ")"
      });
    }
    return visit2;
    function visit2() {
      let result = empty;
      let subresult;
      let offset;
      let grandparents;
      if (!test || is2(node, index, parents[parents.length - 1] || void 0)) {
        result = toResult(visitor(node, parents));
        if (result[0] === EXIT) {
          return result;
        }
      }
      if ("children" in node && node.children) {
        const nodeAsParent = (
          /** @type {UnistParent} */
          node
        );
        if (nodeAsParent.children && result[0] !== SKIP) {
          offset = (reverse ? nodeAsParent.children.length : -1) + step;
          grandparents = parents.concat(nodeAsParent);
          while (offset > -1 && offset < nodeAsParent.children.length) {
            const child = nodeAsParent.children[offset];
            subresult = factory(child, offset, grandparents)();
            if (subresult[0] === EXIT) {
              return subresult;
            }
            offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
          }
        }
      }
      return result;
    }
  }
}
function toResult(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE, value];
  }
  return value === null || value === void 0 ? empty : [value];
}

// node_modules/unist-util-visit/lib/index.js
function visit(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
  let reverse;
  let test;
  let visitor;
  {
    test = testOrVisitor;
    visitor = visitorOrReverse;
    reverse = maybeReverse;
  }
  visitParents(tree, test, overload, reverse);
  function overload(node, parents) {
    const parent = parents[parents.length - 1];
    const index = parent ? parent.children.indexOf(node) : void 0;
    return visitor(node, index, parent);
  }
}

// src/autoCardLink.inline.scss
var autoCardLink_inline_default = ".cardlink-box {\n  display: flex;\n  text-decoration: none;\n  border: 1px solid var(--dark);\n  border-radius: 8px;\n  margin: 16px 0;\n  transition: 0.1s ease-in-out;\n  color: var(--dark);\n  overflow: hidden;\n  position: relative;\n  height: 10em;\n}\n.cardlink-box:hover {\n  background-color: var(--light);\n  transform: scale(1.01);\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);\n}\n.cardlink-box svg {\n  position: absolute;\n  top: 6px;\n  right: 6px;\n}\n\n.cardlink-contents {\n  display: flex;\n}\n\n.cardlink-image-wrapper {\n  border-radius: 0;\n  height: 100%;\n  flex-grow: 0;\n  flex-shrink: 0;\n  pointer-events: none;\n  max-width: 50%;\n}\n@media (max-width: 700px) {\n  .cardlink-image-wrapper {\n    display: none !important;\n  }\n}\n.cardlink-image-wrapper .lightbox-wrapper {\n  max-width: 100% !important;\n}\n\n.cardlink-image {\n  width: unset !important;\n  border-radius: 0;\n  height: 100%;\n  object-fit: cover;\n  flex-grow: 0;\n  flex-shrink: 0;\n  pointer-events: none;\n  margin: 0;\n}\n\n.cardlink-content {\n  display: flex;\n  flex-direction: column;\n  padding: 12px;\n  flex-grow: 1;\n}\n\n.cardlink-title {\n  font-size: 1.1em;\n  font-weight: bold;\n  color: var(--tertiary);\n  margin-bottom: 4px;\n}\n\n.cardlink-description {\n  font-size: 0.9em;\n  max-height: 80px;\n  margin-bottom: 8px;\n  color: var(--dark);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  line-clamp: 3;\n  -webkit-line-clamp: 3;\n}\n\n.cardlink-info {\n  margin-top: auto;\n  display: flex;\n}\n\n.cardlink-favicon {\n  width: 20px;\n  height: 20px;\n  margin: 0 0;\n  margin-right: 8px;\n  vertical-align: middle;\n}\n\n.cardlink-host {\n  color: var(--tertiary);\n}";

// src/transformer.ts
var urlPrefix = "url: ";
var titlePrefix = 'title: "';
var descriptionPrefix = 'description: "';
var hostPrefix = "host: ";
var faviconPrefix = "favicon: ";
var imagePrefix = "image: ";
var AutoCardLink = () => {
  return {
    name: "AutoCardLink",
    markdownPlugins() {
      return [
        () => {
          return (tree, _file) => {
            visit(tree, "code", (node, index, parent) => {
              if (node.lang === "cardlink") {
                const content = node.value.split("\n");
                const url = content.find((line) => line.startsWith(urlPrefix)) ? removePrefix(content.find((line) => line.startsWith(urlPrefix)), urlPrefix) : "";
                const title = content.find((line) => line.startsWith(titlePrefix)) ? removePrefix(
                  content.find((line) => line.startsWith(titlePrefix)),
                  titlePrefix
                ).replace(/"/g, "") : "";
                const description = content.find((line) => line.includes(descriptionPrefix)) ? removePrefix(
                  content.find((line) => line.includes(descriptionPrefix)),
                  descriptionPrefix
                ).replace(/"/g, "") : "";
                const host = content.find((line) => line.startsWith(hostPrefix)) ? removePrefix(content.find((line) => line.startsWith(hostPrefix)), hostPrefix) : "";
                const favicon = content.find((line) => line.startsWith(faviconPrefix)) ? removePrefix(
                  content.find((line) => line.startsWith(faviconPrefix)),
                  faviconPrefix
                ) : "";
                const image = content.find((line) => line.startsWith(imagePrefix)) ? removePrefix(content.find((line) => line.startsWith(imagePrefix)), imagePrefix) : "";
                const newHtmlNode = (() => {
                  if (favicon && image) {
                    return {
                      type: "html",
                      value: `
                                                <a href="${url}" class="cardlink-box" target="_blank" rel="noopener noreferrer">
                                                    <div class="cardlink-contents">
                                                        <div class="cardlink-image-wrapper">
                                                            <img class="cardlink-image" data-lightbox-ignore="true" src="${image}" alt="${host}"></img>
                                                        </div>
                                                        <div class="cardlink-content">
                                                            <div class="cardlink-title">${title}</div>
                                                            <div class="cardlink-description">${description}</div>
                                                            <div class="cardlink-info">
                                                                <img class="cardlink-favicon" data-lightbox-ignore="true" src="${favicon}" alt="${host}"></img>
                                                                <span class="cardlink-host">${host}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            `
                    };
                  } else if (favicon) {
                    return {
                      type: "html",
                      value: `
                                                <a href="${url}" class="cardlink-box" target="_blank" rel="noopener noreferrer">
                                                    <div class="cardlink-contents">
                                                        <div class="cardlink-content">
                                                            <div class="cardlink-title">${title}</div>
                                                            <div class="cardlink-description">${description}</div>
                                                            <div class="cardlink-info">
                                                                <img class="cardlink-favicon" data-lightbox-ignore="true" src="${favicon}" alt="${host}"></img>
                                                                <span class="cardlink-host">${host}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            `
                    };
                  } else if (image) {
                    return {
                      type: "html",
                      value: `
                                                <a href="${url}" class="cardlink-box" target="_blank" rel="noopener noreferrer">
                                                    <div class="cardlink-contents">
                                                        <div class="cardlink-image-wrapper">
                                                            <img class="cardlink-image" data-lightbox-ignore="true" src="${image}" alt="${host}"></img>
                                                        </div>
                                                        <div class="cardlink-content">
                                                            <div class="cardlink-title">${title}</div>
                                                            <div class="cardlink-description">${description}</div>
                                                            <div class="cardlink-info">
                                                                <span class="cardlink-host">${host}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            `
                    };
                  } else {
                    return {
                      type: "html",
                      value: `
                                                <a href="${url}" class="cardlink-box" target="_blank" rel="noopener noreferrer">
                                                    <div class="cardlink-contents">
                                                        <div class="cardlink-content">
                                                            <div class="cardlink-title">${title}</div>
                                                            <div class="cardlink-description">${description}</div>
                                                            <div class="cardlink-info">
                                                                <span class="cardlink-host">${host}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            `
                    };
                  }
                })();
                if (parent && index !== void 0) {
                  parent.children.splice(index, 1, newHtmlNode);
                }
              }
            });
          };
        }
      ];
    },
    externalResources() {
      const js = [];
      const css = [];
      css.push({
        content: autoCardLink_inline_default,
        inline: true
      });
      return { js, css };
    }
  };
};
function removePrefix(text, prefix) {
  if (!text) return "";
  if (text.startsWith(prefix)) {
    return text.substring(prefix.length);
  }
  return text;
}

export { AutoCardLink };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map