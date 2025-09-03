import React, { useEffect } from "react";
import { DiffEditor, useMonaco } from "@monaco-editor/react";
import type { editor as MonacoEditorType } from "monaco-editor";
// optional diff stats
import { diffLines } from "diff";
import { FaRegCopy } from "react-icons/fa";
import { createRoot } from "react-dom/client";

type Props = {
  original: string;
  modified: string;
  language?: string; // e.g. "javascript", "typescript", "python"
  theme?: "light" | "dark";
  sideBySide?: boolean;
};

export default function MonacoDiff({
  original,
  modified,
  language = "javascript",
  theme,
  sideBySide = true,
}: Props) {
  const monaco = useMonaco();
  const [renderSideBySide, setRenderSideBySide] = React.useState(sideBySide);
  useEffect(() => {
    if (!monaco) return;
    // optional: define a custom theme (or use "vs-dark"/"light")
    monaco.editor.defineTheme("snippet-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: { "editor.background": "#0f172a" },
    });
  }, [monaco]);

  useEffect(() => {
    const btns = document.querySelectorAll(".diff-toolbar button");
    const copyBtn = Array.from(btns).find(
      (b) => b.textContent.trim() === "Copy Optimized"
    );

    if (copyBtn) {
      // remove all child nodes
      copyBtn.textContent = "";

      const iconContainer = document.createElement("span");
      iconContainer.style.display = "inline-flex";
      copyBtn.appendChild(iconContainer);

      const root = createRoot(iconContainer);

      // render with updated theme color
      root.render(<FaRegCopy size={20} style={{ color: "#003f88" }} />);
    }
  }, []);

  // optional: calculate a simple lines added/removed summary using 'diff'
  const getDiffSummary = React.useMemo(() => {
    try {
      const parts = diffLines(original || "", modified || "");
      let added = 0,
        removed = 0;
      for (const p of parts) {
        const lines = p.value.split("\n").filter(Boolean).length;
        if ((p as any).added) added += lines;
        if ((p as any).removed) removed += lines;
      }
      return { added, removed };
    } catch (e) {
      return { added: 0, removed: 0 };
    }
  }, [original, modified]);

  // Force remount key when switching render mode (easy trick)
  const key = renderSideBySide ? "sbs" : "inline";

  return (
    <div>
      <div className="diff-toolbar">
        <button onClick={() => setRenderSideBySide((s) => !s)}>
          {renderSideBySide ? "Switch to Inline" : "Switch to Side-by-side"}
        </button>
        <button onClick={() => navigator.clipboard.writeText(modified || "")}>
          Copy Optimized
        </button>
        <div className="diff-summary">
          {getDiffSummary.added === 0 && getDiffSummary.removed === 0
            ? "No line changes detected"
            : `+${getDiffSummary.added} / -${getDiffSummary.removed}`}
        </div>
      </div>

      <div className="monaco-diff-shell" key={key}>
        <DiffEditor
          original={original || "// original code empty"}
          modified={modified || "// no optimized code yet"}
          language={language}
          theme={theme === "dark" ? "snippet-dark" : "light"}
          height="100%"
          options={{
            readOnly: true,
            renderSideBySide: renderSideBySide,
            minimap: { enabled: false },
            wordWrap: "on",
            automaticLayout: true,
          }}
          onMount={(editor: MonacoEditorType.IStandaloneDiffEditor) => {
            // optional control on mount:
            // editor.getOriginalEditor().updateOptions({ fontSize: 13 });
            // editor.getModifiedEditor().updateOptions({ fontSize: 13 });
          }}
        />
      </div>
    </div>
  );
}
