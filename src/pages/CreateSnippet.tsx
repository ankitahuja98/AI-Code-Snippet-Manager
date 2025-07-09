import TextField from "@mui/material/TextField";
import type { Snippet } from "../types/addSnippet";
import { useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { githubLight } from "@uiw/codemirror-theme-github";
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
import Button from "@mui/material/Button";
import copy from "copy-to-clipboard";
import { languageOptions } from "../utils/LanguageOptions";
import type { LanguageType } from "../utils/LanguageOptions";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { lintGutter } from "@codemirror/lint";
import { eslintLinterExtension } from "../utils/eslintLinter";
import { v4 as uuidv4 } from "uuid";
import OptimiseCodeSwitch from "../utils/OptimiseCodeSwitch";
import LoadingSpinner from "../utils/LoadingSpinner";
import { showToast } from "../utils/Toast";
import AutocompleteTags, {
  type TagOptionType,
} from "../components/AutocompleteTags";
import { Typography } from "@mui/material";
import { useTheme } from "../Context/ThemeContext";
import { getFormattedDate } from "../utils/getFormattedDate";
import { useNavigate } from "react-router-dom";

const CreateSnippet = () => {
  const UniqueId = uuidv4();
  const { theme } = useTheme();

  const [snippet, setSnippet] = useState<Snippet>({
    id: UniqueId,
    title: "",
    language: "javascript",
    code: "",
    dateCreated: getFormattedDate(),
    AIInsights: "",
    optimiseCode: "",
    tags: [],
    optimisationRequired: false,
  });

  const [AllTags, setAllTags] = useState<TagOptionType[]>([]);
  const [isUserCodeFullscreen, setisUserCodeFullscreen] = useState(false);
  const [isOptimiseCodeFullscreen, setisOptimiseCodeFullscreen] =
    useState(false);
  const [showAIFields, setShowAIFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validInput, setValidInput] = useState(false);

  const navigate = useNavigate();

  const updateSnippet = (field: keyof Snippet, value: any) => {
    setSnippet((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (AllTags?.length > 0) {
      setSnippet((prev) => ({ ...prev, tags: AllTags }));
    }
  }, [AllTags]);

  useEffect(() => {
    setValidInput(Boolean(snippet.title && snippet.language && snippet.code));
  }, [snippet]);

  const userCodeFullScreenRef = useRef<HTMLDivElement>(null);
  const optimiseCodeFullScreenRef = useRef<HTMLDivElement>(null);

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
      alert("Formatting failed. Please check the code syntax.");
    }
  };

  const handleCodeEditor = (value: string) => {
    setSnippet((prev) => ({ ...prev, code: value }));
  };

  const toggleFullscreen = (value: string) => {
    if (value === "userCode") {
      if (!isUserCodeFullscreen) {
        if (userCodeFullScreenRef.current?.requestFullscreen) {
          userCodeFullScreenRef.current.requestFullscreen();
        }
      } else {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
    } else if (value === "optimiseCode") {
      if (!isOptimiseCodeFullscreen) {
        if (optimiseCodeFullScreenRef.current?.requestFullscreen) {
          optimiseCodeFullScreenRef.current.requestFullscreen();
        }
      } else {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenEl = document.fullscreenElement;

      setisUserCodeFullscreen(fullscreenEl === userCodeFullScreenRef.current);
      setisOptimiseCodeFullscreen(
        fullscreenEl === optimiseCodeFullScreenRef.current
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Call GEMINI API
  const handleAIEnhancement = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://ai-code-snippet-manager-server.onrender.com/api/gemini",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: snippet.title,
            language: snippet.language,
            code: snippet.code,
          }),
        }
      );
      const data = await res.json();

      // console.log("AI RESPONSE", data);

      showToast("AI Response Generated!", "success");

      setAllTags(data.tags);

      setSnippet((prev) => ({
        ...prev,
        AIInsights: data.AIInsights,
        // tags: data.tags,
        optimiseCode: data.optimiseCode,
        optimisationRequired: data.optimisationRequired,
      }));
      setShowAIFields(true);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.error || err?.message || "Something went wrong.";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSnippet = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("snippets") || "[]");
      saved.push(snippet);
      localStorage.setItem("snippets", JSON.stringify(saved));
      showToast("Code snippet is saved!", "success");
    } catch (error) {
      showToast("Code snippet is saved!", "success");
    }
  };

  console.log("snippet", snippet);

  return (
    <>
      {loading && <LoadingSpinner />}
      <main className="flex-1 p-6 pt-3  overflow-y-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">Add Snippet</h2>
        </div>
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

        <div
          ref={userCodeFullScreenRef}
          className={`relative border rounded-lg shadow`}
        >
          <div className="flex justify-between items-center pb-2.5 pt-3.5 px-5 bg-zinc-900 text-white rounded-t-lg">
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
                  "& .MuiSvgIcon-root": {
                    color: "#ccc",
                  },
                  // "& .MuiAutocomplete-inputRoot": {
                  //   paddingTop: "2px !important",
                  //   paddingBottom: "2px !important",
                  // },
                  "& .MuiOutlinedInput-root": {
                    height: "32px", // sets fixed height
                    minHeight: "32px",
                    fontSize: "0.8rem",
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
                onClick={() => toggleFullscreen("userCode")}
                className="px-2 py-0.5 rounded cursor-pointer"
              >
                {isUserCodeFullscreen ? (
                  <CloseFullscreenIcon />
                ) : (
                  <OpenInFullIcon />
                )}
              </button>
            </Box>
          </div>
          <CodeMirror
            value={snippet.code}
            height={isUserCodeFullscreen ? "100vh" : "350px"}
            theme={theme === "dark" ? oneDark : githubLight}
            extensions={[
              getExtension(snippet.language),
              lintGutter(),
              snippet.language === "javascript" ? eslintLinterExtension() : [],
            ]}
            onChange={handleCodeEditor}
          />
        </div>

        {showAIFields && (
          <>
            <Box sx={{ width: "100%", margin: "1.5rem 0rem", display: "flex" }}>
              <OptimiseCodeSwitch
                checked={snippet.optimisationRequired}
                onChange={(e) =>
                  updateSnippet("optimisationRequired", e.target.checked)
                }
              />
              <span style={{ marginLeft: "5rem" }}>
                <AutocompleteTags
                  value={snippet.tags}
                  options={AllTags}
                  onChange={(newTags) =>
                    setSnippet({ ...snippet, tags: newTags })
                  }
                />
              </span>
            </Box>
            <TextField
              id="outlined-multiline-static"
              label="AI Insights"
              multiline
              minRows={1}
              maxRows={10}
              value={snippet.AIInsights}
              onChange={(e) => updateSnippet("AIInsights", e.target.value)}
              placeholder="AI-generated summary and suggestions will appear here…"
              sx={{ width: "100%", marginBottom: "1.5rem" }}
            />

            <div
              ref={optimiseCodeFullScreenRef}
              className={`relative border rounded-lg shadow`}
            >
              <div className="flex justify-between items-center pb-2.5 pt-3.5 px-5 bg-zinc-900 text-white rounded-t-lg">
                <Typography>Optimised Code</Typography>
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
                    onClick={() => toggleFullscreen("optimiseCode")}
                    className="px-2 py-0.5 rounded cursor-pointer"
                  >
                    {isOptimiseCodeFullscreen ? (
                      <CloseFullscreenIcon />
                    ) : (
                      <OpenInFullIcon />
                    )}
                  </button>
                </Box>
              </div>
              <CodeMirror
                value={snippet.optimiseCode}
                height={isOptimiseCodeFullscreen ? "100vh" : "350px"}
                theme={theme === "dark" ? oneDark : githubLight}
                extensions={[
                  getExtension(snippet.language),
                  lintGutter(),
                  snippet.language === "javascript"
                    ? eslintLinterExtension()
                    : [],
                ]}
                onChange={(value) => updateSnippet("optimiseCode", value)}
              />
            </div>
          </>
        )}

        <Box sx={{ width: "100%", margin: "1.5rem 0rem" }}>
          <Button
            type="button"
            variant="contained"
            disabled={!validInput}
            onClick={handleAIEnhancement}
            className="mt-4 px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition duration-300 relative overflow-hidden"
            sx={{ margin: "0rem 2rem 0rem 0rem" }}
          >
            <span
              className={`relative z-10 ${!validInput ? "text-gray-300 " : "text-white font-bold "}`}
            >
              {!showAIFields ? "✨ Enhance with AI" : "✨ Regenerate with AI"}
            </span>
            <span className="absolute inset-0 bg-white opacity-10 rounded-xl pointer-events-none"></span>
          </Button>
          {showAIFields && (
            <Button
              type="button"
              variant="contained"
              color="success"
              onClick={handleSaveSnippet}
              className="mt-4 px-6 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transition duration-300 relative overflow-hidden"
            >
              <span
                className={`relative z-10 ${!validInput ? "text-gray-300 " : "text-white font-bold "}`}
                onClick={() => navigate("/")}
              >
                Save
              </span>
              <span className="absolute inset-0 bg-white opacity-10 rounded-xl pointer-events-none"></span>
            </Button>
          )}
        </Box>
      </main>
    </>
  );
};

export default CreateSnippet;
