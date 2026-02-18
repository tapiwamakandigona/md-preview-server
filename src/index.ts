#!/usr/bin/env node
import * as fs from "fs";
import * as http from "http";
import * as path from "path";

const TEMPLATE = (title: string, body: string) => `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${title}</title>
<style>
  body { font-family: -apple-system, system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #333; }
  pre { background: #f4f4f4; padding: 16px; border-radius: 8px; overflow-x: auto; }
  code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; }
  h1, h2, h3 { border-bottom: 1px solid #eee; padding-bottom: 8px; }
  blockquote { border-left: 4px solid #ddd; margin-left: 0; padding-left: 16px; color: #666; }
</style>
<script>setTimeout(() => location.reload(), 2000)</script>
</head><body>${body}</body></html>`;

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^/, "<p>").replace(/$/, "</p>");
}

function main() {
  const file = process.argv[2];
  const port = parseInt(process.argv[3] || "3000");
  
  if (!file) {
    console.log("Usage: md-preview <file.md> [port]");
    process.exit(0);
  }
  
  const resolved = path.resolve(file);
  const server = http.createServer((req, res) => {
    const content = fs.readFileSync(resolved, "utf-8");
    const html = TEMPLATE(path.basename(file), markdownToHtml(content));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
  
  server.listen(port, () => {
    console.log(`Previewing ${file} at http://localhost:${port}`);
    console.log("Auto-refreshes every 2 seconds");
  });
}

main();
