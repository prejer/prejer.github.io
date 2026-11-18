// Renders LaTeX in _notes/*.src.html with KaTeX and injects it into the matching page.
// Usage: npm i katex@0.16.11 && node _notes/build.js
const fs = require("fs"), path = require("path"), katex = require("katex");
const root = path.join(__dirname, "..");
const render = (tex, display) => katex.renderToString(tex, { displayMode: display, throwOnError: true, output: "html" });
for (const f of fs.readdirSync(__dirname).filter(f => f.endsWith(".src.html"))) {
  let src = fs.readFileSync(path.join(__dirname, f), "utf8");
  src = src.replace(/\\\[([\s\S]+?)\\\]/g, (_, t) => render(t.trim(), true));
  src = src.replace(/\\\(([\s\S]+?)\\\)/g, (_, t) => render(t.trim(), false));
  const page = path.join(root, "notes-" + f.replace(".src.html", ".html"));
  const html = fs.readFileSync(page, "utf8");
  const a = html.indexOf("<!--notes:start-->"), b = html.indexOf("<!--notes:end-->");
  if (a < 0 || b < 0) throw new Error("markers missing in " + page);
  fs.writeFileSync(page, html.slice(0, a + 18) + "\n" + src + html.slice(b));
  console.log("built", page);
}
