import { linter } from "@codemirror/lint";
import type { Diagnostic } from "@codemirror/lint";
import { Linter } from "eslint-linter-browserify"; // ✅ named import

export function eslintLinterExtension() {
  const linterInstance = new Linter(); // ✅ this works

  return linter((view) => {
    const code = view.state.doc.toString();
    const diagnostics: Diagnostic[] = [];

    try {
      const messages = linterInstance.verify(code, [
        {
          files: ["**/*.js"],
          languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
            globals: {
              console: true,
              window: true,
              document: true,
            },
          },
          rules: {
            "no-undef": "error",
            "no-unused-vars": "warn",
          },
        },
      ]);

      for (const msg of messages) {
        const from =
          msg.line && msg.column
            ? view.state.doc.line(msg.line).from + (msg.column - 1)
            : 0;
        const to =
          msg.endLine && msg.endColumn
            ? view.state.doc.line(msg.endLine).from + (msg.endColumn - 1)
            : from + 1;

        diagnostics.push({
          from,
          to,
          severity: msg.severity === 2 ? "error" : "warning",
          message: msg.message || "Unknown ESLint error",
        });
      }
    } catch (err: any) {
      diagnostics.push({
        from: 0,
        to: 1,
        severity: "error",
        message: `Linting failed: ${err?.message || "unknown error"}`,
      });
    }

    return diagnostics;
  });
}
