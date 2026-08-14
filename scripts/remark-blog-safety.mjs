function location(node) {
  const line = node.position?.start?.line;
  return line ? ` at line ${line}` : "";
}

function walk(node, visit) {
  visit(node);
  for (const child of node.children ?? []) walk(child, visit);
}

export default function remarkBlogSafety() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type === "heading" && node.depth === 1) {
        throw new Error(`Blog articles must not contain an H1${location(node)}.`);
      }
      if (["html", "mdxjsEsm", "mdxFlowExpression", "mdxTextExpression", "mdxJsxFlowElement", "mdxJsxTextElement"].includes(node.type)) {
        throw new Error(`Unsafe MDX syntax (${node.type}) is not allowed in blog content${location(node)}.`);
      }
    });
  };
}
