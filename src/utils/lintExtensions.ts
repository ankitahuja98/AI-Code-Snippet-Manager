// utils/lintExtensions.ts
import type { Diagnostic } from "@codemirror/lint";
import { linter } from "@codemirror/lint";

import * as acorn from "acorn";

export function javascriptLinter() {
  return linter((view) => {
    const diagnostics: Diagnostic[] = [];
    try {
      acorn.parse(view.state.doc.toString(), {
        ecmaVersion: "latest",
        sourceType: "module",
      });
    } catch (e: any) {
      diagnostics.push({
        from: e.pos ?? 0,
        to: e.pos ?? 1,
        severity: "error",
        message: e.message,
      });
    }
    return diagnostics;
  });
}
