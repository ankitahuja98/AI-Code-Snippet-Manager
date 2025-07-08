import { useEffect, useState } from "react";
import type { Snippet } from "../types/addSnippet";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiPin } from "react-icons/ti";
import type { TagOptionType } from "./AutocompleteTags";
import { capitalize, styled } from "@mui/material";

const SnippetList = () => {
  const [AllSnippets, setAllSnippets] = useState<Snippet[]>([]);

  useEffect(() => {
    setAllSnippets(JSON.parse(localStorage.getItem("snippets") || "[]"));
  }, []);

  const handleDelete = (id: number | string) => {};

  const handleEdit = (id: number | string) => {};

  const handlePin = (id: number | string) => {};

  const capitalise = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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
    "#e0f7fa",
    "#fce4ec",
    "#e8eaf6",
    "#f3e5f5",
    "#fff3e0",
    "#e8f5e9",
  ];

  const getColorForTag = (tag: TagOptionType) => {
    const index = tag.id % tagColors.length;
    return tagColors[index];
  };

  return (
    <div className="overflow-x-auto border border-gray-200">
      <table className="min-w-full border border-gray-200 rounded-md shadow-sm overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border border-gray-200">
              Title
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border border-gray-200">
              Language
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border border-gray-200">
              AI Insights
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border border-gray-200">
              Tags
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border border-gray-200">
              Optimisation Required
            </th>
            <th className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {AllSnippets.map((snippet) => (
            <tr key={snippet.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-2 py-1 text-sm text-gray-800 border border-gray-200">
                {snippet.title}
              </td>
              <td className="px-2 py-1text-sm text-gray-800 border border-gray-200">
                {capitalise(snippet.language)}
              </td>
              <td className="px-2 py-1 text-sm text-gray-800 border border-gray-200">
                <div className="line-clamp-2">{snippet.AIInsights}</div>
              </td>
              <td
                className="px-2 py-1 flex items-center text-sm text-gray-800 border border-gray-200"
                style={{ minHeight: "6rem", maxHeight: "8rem" }}
              >
                {snippet.tags.map((tag: any) => {
                  const bgColor = getColorForTag(tag); // 🔥 assign color
                  return (
                    <StyledTag key={tag.id} bgcolor={bgColor}>
                      <span key={tag.id}>{capitalize(tag.name)}</span>
                    </StyledTag>
                  );
                })}
              </td>
              <td className="px-2 py-1 text-center text-sm text-gray-800 border border-gray-200">
                {snippet.optimisationRequired ? "Yes" : "No"}
              </td>
              <td className="px-1 text-sm text-center border border-gray-200">
                <button
                  onClick={() => handleEdit(snippet.id)}
                  className=" text-yellow-800 px-1 rounded text-base"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(snippet.id)}
                  className=" text-red-800 px-1 rounded text-base"
                >
                  <MdDelete />
                </button>
                <button
                  onClick={() => handlePin(snippet.id)}
                  className=" text-green-800 px-1 rounded text-base"
                >
                  <TiPin />
                </button>
              </td>
            </tr>
          ))}
          {AllSnippets.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="text-center text-gray-500 py-6 border border-gray-200"
              >
                No snippets found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SnippetList;
