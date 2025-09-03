import { useSnippetContext } from "../Context/EditSnippetContext";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Button, capitalize, styled } from "@mui/material";
import { useTheme } from "../Context/ThemeContext";
import type { TagOptionType } from "../components/AutocompleteTags";
import TooltipWrapper from "../components/TooltipWrapper";
import { IoListCircle } from "react-icons/io5";
import MonacoDiff from "../components/MonacoDiff";
import NodataFound from "../images/No-Data.gif";
import { useNavigate } from "react-router-dom";

export default function ViewSnippet() {
  const { snippetToEdit } = useSnippetContext();
  const { theme } = useTheme();

  const navigate = useNavigate();

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
      {snippetToEdit ? (
        <>
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
                <FaStar
                  style={{
                    color: "#f4d35e",
                    fontSize: "22px",
                    marginTop: "5px",
                  }}
                />
              ) : (
                <FaRegStar style={{ fontSize: "22px", marginTop: "5px" }} />
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
          <p className="font-semibold text-md mt-3">
            {capitalize(snippetToEdit?.AIInsights || "")}
          </p>
          {/* <p className="font-semibold text-md mt-5">{tags}</p> */}

          <MonacoDiff
            original={snippetToEdit.code}
            modified={snippetToEdit.optimiseCode ?? ""}
            language={snippetToEdit.language}
            theme={theme === "light" ? "light" : "dark"}
          />
        </>
      ) : (
        <div className="h-full flex justify-center items-center flex-col">
          <img src={NodataFound} alt="No data found" className="h-60 w-60" />
          <Button
            type="button"
            variant="contained"
            className="mt-4 px-6 py-2 rounded-xl text-white bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] hover:brightness-110 shadow-lg hover:shadow-xl transition duration-300 relative overflow-hidden"
          >
            <span
              className="font-bold flex items-center text-xs sm:text-sm"
              onClick={() => navigate("/library")}
            >
              <IoListCircle className="pr-2 text-2xl" /> Browse Snippet
            </span>
          </Button>
        </div>
      )}
    </main>
  );
}
