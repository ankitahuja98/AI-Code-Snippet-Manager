import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { sql } from "@codemirror/lang-sql";
import { markdown } from "@codemirror/lang-markdown";
import { StreamLanguage } from "@codemirror/stream-parser";
import { shell } from "@codemirror/legacy-modes/mode/shell";

export function getExtension(lang: string) {
  switch (lang) {
    case "javascript":
      return javascript({ typescript: true, jsx: true });
    case "typescript":
      return javascript({ typescript: true, jsx: true });
    case "html":
      return html();
    case "css":
      return css();
    case "json":
      return json();
    case "python":
      return python();
    case "java":
      return java();
    case "sql":
      return sql();
    case "markdown":
      return markdown();
    case "shell":
    case "bash":
      return StreamLanguage.define(shell as any);
    default:
      return javascript(); // default fallback
  }
}
