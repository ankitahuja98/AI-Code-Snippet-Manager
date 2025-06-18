import SideBar from "../components/SideBar";
import TextField from "@mui/material/TextField";
import type { Snippet } from "../types/addSnippet";
import { useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { getExtension } from "../utils/languageExtensions";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import parserEstree from "prettier/plugins/estree";
import parserHTML from "prettier/plugins/html";
import parserCSS from "prettier/plugins/postcss";
import parserMarkdown from "prettier/plugins/markdown";
import copy from "copy-to-clipboard";
import { languageOptions } from "../utils/LanguageOptions";
import type { LanguageType } from "../utils/LanguageOptions";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

const CreateSnippet = () => {
  const [snippet, setSnippet] = useState<Snippet>({
    title: "",
    language: "javascript",
    code: "",
    summaryAndSuggestion: "",
    optimiseCode: "",
    tags: [],
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const languageToParser: any = {
    javascript: { parser: "babel", plugins: [parserBabel, parserEstree] },
    react: { parser: "babel", plugins: [parserBabel, parserEstree] },
    typescript: { parser: "babel-ts", plugins: [parserBabel, parserEstree] },
    json: { parser: "json", plugins: [parserBabel, parserEstree] },
    html: { parser: "html", plugins: [parserHTML] },
    angular: { parser: "html", plugins: [parserHTML] },
    css: { parser: "css", plugins: [parserCSS] },
    markdown: { parser: "markdown", plugins: [parserMarkdown] },
  };
  const handleFormat = async () => {
    const config = languageToParser[snippet.language];

    if (!config) {
      alert("Unsupported language selected for formatting.");
      return;
    }

    if (!snippet.code.trim()) {
      alert("Code is empty. Please enter some code to format.");
      return;
    }

    try {
      const formatted = await prettier.format(snippet.code, {
        parser: config.parser,
        plugins: config.plugins,
      });

      setSnippet((prev) => ({ ...prev, code: formatted }));
    } catch (err) {
      console.error("Prettier formatting error:", err);
      alert("Formatting failed. Please check the code syntax.");
    }
  };

  const handleCodeEditor = (value: string) => {
    setSnippet((prev) => ({ ...prev, code: value }));
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (editorRef.current?.requestFullscreen) {
        editorRef.current.requestFullscreen();
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div ref={editorRef} className="flex h-screen">
      <SideBar />
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Add Snippet</h2>
        </div>
        <form>
          <TextField
            id="title"
            required
            label="Title"
            value={snippet.title}
            onChange={(e) =>
              setSnippet((prev) => ({ ...prev, title: e.target.value }))
            }
            variant="outlined"
            size="small"
            sx={{ width: "100%", marginBottom: "1.5rem" }}
          />

          {/* <CodeEditor snippet={snippet} setSnippet={setSnippet} /> */}
          <div className={`relative border rounded-lg shadow`}>
            <div className="flex justify-between items-center p-2 bg-zinc-900 text-white rounded-t-lg">
              <Box>
                <Autocomplete
                  value={
                    languageOptions.find(
                      (opt: LanguageType) => opt.value === snippet.language
                    ) || null
                  }
                  onChange={(_, newValue: LanguageType | null) =>
                    setSnippet((prev) => ({
                      ...prev,
                      language: newValue?.value || "",
                    }))
                  }
                  options={languageOptions}
                  getOptionLabel={(option: LanguageType) => option.label}
                  sx={{
                    width: 200,
                    border: "1px solid grey",
                    "& .MuiSvgIcon-root": {
                      color: "#ccc", // ✅ Applies to both clear and dropdown icons
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Language"
                      InputLabelProps={{
                        style: { color: "#ccc", backgroundColor: "#18181B" }, // Label color
                      }}
                      InputProps={{
                        ...params.InputProps,
                        style: {
                          color: "#fff", // Input text
                          backgroundColor: "transparent", // Background
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#555",
                          },
                          "&:hover fieldset": {
                            borderColor: "#888",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#00bcd4",
                          },
                        },
                      }}
                    />
                  )}
                  size="small"
                />
              </Box>
              <Box>
                <button
                  type="button"
                  onClick={handleFormat}
                  className="px-2 py-0.5 rounded cursor-pointer"
                >
                  <FormatAlignLeftIcon />
                </button>
                <button
                  type="button"
                  onClick={() => copy(snippet.code)}
                  className="px-2 py-0.5 rounded cursor-pointer"
                >
                  <ContentCopyIcon />
                </button>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="px-2 py-0.5 rounded cursor-pointer"
                >
                  {isFullscreen ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
                </button>
              </Box>
            </div>
            <CodeMirror
              value={snippet.code}
              height="350px"
              theme={oneDark}
              extensions={[getExtension(snippet.language)]}
              onChange={handleCodeEditor}
            />
          </div>

          <button className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Save Snippet
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateSnippet;
