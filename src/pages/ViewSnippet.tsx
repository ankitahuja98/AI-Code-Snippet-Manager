import { useSnippetContext } from "../Context/EditSnippetContext";
import CodeMirror from "@uiw/react-codemirror";
import { FaStar, FaRegStar } from "react-icons/fa";
import { oneDark } from "@codemirror/theme-one-dark";
import { githubLight } from "@uiw/codemirror-theme-github";
import { getExtension } from "../utils/languageExtensions";
import { lintGutter } from "@codemirror/lint";
import { eslintLinterExtension } from "../utils/eslintLinter";
import { capitalize, styled } from "@mui/material";
import { useTheme } from "../Context/ThemeContext";
import { EditorView } from "@codemirror/view";
import type { TagOptionType } from "../components/AutocompleteTags";
import TooltipWrapper from "../components/TooltipWrapper";

export default function ViewSnippet() {
  const { snippetToEdit } = useSnippetContext();
  const { theme } = useTheme();

  const StyledTag = styled("div", {
    shouldForwardProp: (prop) => prop !== "bgcolor",
  })<{ bgcolor: string }>(({ bgcolor }) => ({
    display: "flex",
    alignItems: "center",
    height: "24px",
    margin: "2px",
    lineHeight: "22px",
    backgroundColor: bgcolor,
    border: "1px solid #b5b5b5",
    borderRadius: "2px",
    padding: "0 4px 0 10px",
    "& span": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      color: "#333",
    },
    "& .tag-close-icon": {
      fontSize: "20px",
      cursor: "pointer",
      padding: "4px",
      color: "#333",
      "&:hover": {
        color: "red",
      },
    },
  }));

  const tagColors = [
    "#e0f7fa", // light cyan
    "#fce4ec", // pink
    "#e8eaf6", // indigo light
    "#f3e5f5", // lavender
    "#fff3e0", // orange pastel
    "#e8f5e9", // green pastel
    "#f0f4c3", // light lime
    "#f1f8e9", // mint
    "#f9fbe7", // lemon
    "#ede7f6", // soft purple
    "#e3f2fd", // light blue
    "#fbe9e7", // coral tint
    "#f9fbe7", // creamy yellow
    "#edeef0", // very soft gray
  ];

  const getColorForTag = (tag: TagOptionType) => {
    const index = tag.id % tagColors.length;
    return tagColors[index];
  };

  return (
    <main className="flex-1 p-6 pt-3 overflow-y-auto">
      <div className="flex justify-between">
        <p className="font-bold text-xl">
          <span
            className="w-1 h-4 inline-block rounded mr-1.5"
            style={{ backgroundColor: "#003f88" }}
          ></span>
          {capitalize(snippetToEdit?.title || "")}
        </p>
        <TooltipWrapper
          title={`${snippetToEdit?.isFav ? "Favourite" : "Un-Favourite"}`}
          arrow
        >
          {snippetToEdit?.isFav ? (
            <FaStar style={{ color: "#f4d35e", fontSize: "22px" }} />
          ) : (
            <FaRegStar style={{ fontSize: "22px" }} />
          )}
        </TooltipWrapper>
      </div>
      <span className="font-semibold text-sm text-gray-500">
        {capitalize(snippetToEdit?.language || "")}
      </span>
      <span className="font-semibold text-sm text-gray-500 ml-2"> | </span>
      <span className="font-semibold text-sm text-gray-500 ml-2">
        {capitalize(snippetToEdit?.dateCreated || "")}
      </span>
      <p className="font-semibold text-md mt-5">
        {capitalize(snippetToEdit?.AIInsights || "")}
      </p>
      {/* <p className="font-semibold text-md mt-5">{tags}</p> */}

      <div className="flex flex-wrap gap-1 overflow-hidden mt-3">
        {snippetToEdit?.tags.map((tag: any) => {
          const bgColor = getColorForTag(tag);
          return (
            <StyledTag key={tag.id} bgcolor={bgColor}>
              <span key={tag.id}>{capitalize(tag.name)}</span>
            </StyledTag>
          );
        })}
      </div>

      {/* Code Compare (read-only) */}
      <div className="flex mt-5">
        <span>
          <p className="font-semibold italic text-sm text-gray-500">
            Original Code
          </p>
          <CodeMirror
            value={snippetToEdit?.code}
            height="300px"
            width="600px"
            className="cm-wrapper"
            style={{
              border: "1px solid #00000069",
              boxShadow: "1px 1px 5px #80808069",
            }}
            theme={theme === "dark" ? oneDark : githubLight}
            extensions={[
              getExtension(snippetToEdit?.language || ""),
              lintGutter(),
              snippetToEdit?.language === "javascript"
                ? eslintLinterExtension()
                : [],
              EditorView.editable.of(false), // 👈 makes editor read-only
            ]}
          />
        </span>
        <span className="ml-10">
          <p className="font-semibold italic text-sm text-gray-500">
            Optimised Code By AI
          </p>
          <CodeMirror
            value={snippetToEdit?.optimiseCode}
            height="300px"
            width="600px"
            className="cm-wrapper"
            style={{
              border: "1px solid #00000069",
              boxShadow: "1px 1px 5px #80808069",
            }}
            theme={theme === "dark" ? oneDark : githubLight}
            extensions={[
              getExtension(snippetToEdit?.language || ""),
              lintGutter(),
              snippetToEdit?.language === "javascript"
                ? eslintLinterExtension()
                : [],
              EditorView.editable.of(false), // 👈 makes editor read-only
            ]}
          />
        </span>
      </div>
    </main>
  );
}
