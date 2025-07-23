import { useEffect, useState } from "react";
import type { Snippet } from "../types/addSnippet";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import { TiPin } from "react-icons/ti";
import { CiStar } from "react-icons/ci";

import type { TagOptionType } from "./AutocompleteTags";
import { capitalize, styled } from "@mui/material";
import TooltipWrapper from "./TooltipWrapper";

type searchInpt = {
  searchInput: string;
};

const SnippetList = ({ searchInput }: searchInpt) => {
  const [AllSnippets, setAllSnippets] = useState<Snippet[]>([]);
  const [allData, setAllData] = useState<Snippet[]>([]);

  useEffect(() => {
    const allRaw = JSON.parse(
      localStorage.getItem("snippets") || "[]"
    ) as Snippet[];

    setAllData(
      Array.from(
        new Map(allRaw.map((item: Snippet) => [item.id, item])).values()
      )
    );
  }, []);

  useEffect(() => {
    if (!searchInput) {
      setAllSnippets(allData);
    } else {
      const SearchLowerInput = searchInput.toLowerCase();

      let filterData = allData.filter((val) => {
        const { title, language, AIInsights, tags } = val;

        const tagMatches = tags.some((val) =>
          val.name.toLowerCase().includes(SearchLowerInput)
        );

        return (
          title.toLowerCase().includes(SearchLowerInput) ||
          language.toLowerCase().includes(SearchLowerInput) ||
          AIInsights.toLowerCase().includes(SearchLowerInput) ||
          tagMatches
        );
      });

      setAllSnippets(filterData);
    }
  }, [searchInput, allData]);

  const handleDelete = (id: number | string) => {
    let filterData = allData.filter((val) => {
      return val.id !== id;
    });
    setAllData(filterData);
    localStorage.setItem("snippets", JSON.stringify(filterData));
  };

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

  const useStyle = {
    TableHeader:
      "px-4 py-2 text-left text-md font-bold text-gray-700 border border-gray-200",

    tableBody: "px-2.5 py-2.5 text-sm text-gray-800 border border-gray-200",
  };

  return (
    <div className="overflow-x-auto border border-gray-200">
      <table className="min-w-full border border-gray-200 rounded-md shadow-sm overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className={`${useStyle.TableHeader} w-[10%]`}>Title</th>
            <th className={`${useStyle.TableHeader} w-[10%]`}>Language</th>
            <th className={`${useStyle.TableHeader} w-[40%]`}>AI Insights</th>
            <th className={`${useStyle.TableHeader} w-[15%]`}>Tags</th>
            <th className={`${useStyle.TableHeader} w-[3%]`}>Optimised</th>
            <th className={`${useStyle.TableHeader} w-[12%]`}>Created On</th>
            <th className={`${useStyle.TableHeader} w-[10%]`}>Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {AllSnippets.map((snippet) => (
            <tr key={snippet.id} className="hover:bg-gray-50 transition-colors">
              <td className={useStyle.tableBody}>{snippet.title}</td>
              <td className={useStyle.tableBody}>
                {capitalise(snippet.language)}
              </td>
              <td className={useStyle.tableBody}>
                <div className="line-clamp-2">{snippet.AIInsights}</div>
              </td>
              <td className={useStyle.tableBody}>
                <div className="flex flex-wrap gap-1 overflow-hidden">
                  {snippet.tags.map((tag: any) => {
                    const bgColor = getColorForTag(tag);
                    return (
                      <StyledTag key={tag.id} bgcolor={bgColor}>
                        <span key={tag.id}>{capitalize(tag.name)}</span>
                      </StyledTag>
                    );
                  })}
                </div>
              </td>
              <td className={`${useStyle.tableBody} text-center`}>
                {snippet.optimisationRequired ? "No" : "Yes"}
              </td>
              <td className={`${useStyle.tableBody} text-center`}>
                {snippet.dateCreated}
              </td>
              <td className="px-1 text-sm text-center border border-gray-200">
                <TooltipWrapper title="Pin Snippet" arrow>
                  <button
                    onClick={() => handlePin(snippet.id)}
                    className="text-black-800 px-1.5 rounded text-lg cursor-pointer"
                  >
                    <CiStar />
                  </button>
                </TooltipWrapper>
                <TooltipWrapper title="Edit Snippet" arrow>
                  <button
                    onClick={() => handleEdit(snippet.id)}
                    className=" text-yellow-800 px-1.5 rounded text-lg cursor-pointer"
                  >
                    <FaEdit />
                  </button>
                </TooltipWrapper>
                <TooltipWrapper title="Delete Snippet" arrow>
                  <button
                    onClick={() => handleDelete(snippet.id)}
                    className=" text-red-800 px-1.5 rounded text-lg cursor-pointer"
                  >
                    <MdDelete />
                  </button>
                </TooltipWrapper>
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
