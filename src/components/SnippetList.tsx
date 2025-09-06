import { useEffect, useState } from "react";
import type { Snippet } from "../types/addSnippet";
import { FaEdit, FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaStar, FaRegStar } from "react-icons/fa";
import type { TagOptionType } from "./AutocompleteTags";
import { Button, capitalize, styled } from "@mui/material";
import TooltipWrapper from "./TooltipWrapper";
import { useTheme } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useSnippetContext } from "../Context/EditSnippetContext";
import { showToast } from "../utils/Toast";

type searchInpt = {
  searchInput: string;
};

const SnippetList = ({ searchInput }: searchInpt) => {
  const [snippets, setsnippets] = useState<Snippet[]>([]);
  const [allData, setAllData] = useState<Snippet[]>([]);
  let { theme } = useTheme();
  const { setSnippetToEdit } = useSnippetContext();
  const [selectedRow, setSelectedRow] = useState<(string | number)[]>([]);
  const [snippetPerPage, setSnippetPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const start = (currentPage - 1) * snippetPerPage;
  const end = snippetPerPage * currentPage;

  console.log("pages", start, "---", end);

  console.log("snippetPerPage", snippetPerPage);

  const totalPages = Math.ceil(snippets?.length / snippetPerPage) || 0;

  console.log("selectedRow", selectedRow);

  console.log("snippets", snippets);
  console.log("allData", allData);

  const navigate = useNavigate();

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
      setsnippets(allData);
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

      setsnippets(filterData);
    }
  }, [searchInput, allData]);

  const handleDelete = (id: number | string) => {
    let filterData = allData.filter((val) => {
      return val.id !== id;
    });
    setAllData(filterData);
    localStorage.setItem("snippets", JSON.stringify(filterData));
  };

  const handleEdit = (snippet: Snippet) => {
    setSnippetToEdit(snippet);
    navigate("/addSnippet");
  };

  const handleView = (snippet: Snippet) => {
    setSnippetToEdit(snippet);
    navigate("/viewSnippet");
  };

  const handleFav = (id: number | string) => {
    let filterData = allData.map((val) =>
      val.id === id ? { ...val, isFav: !val.isFav } : val
    );
    setAllData(filterData);

    localStorage.setItem("snippets", JSON.stringify(filterData));
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
    TableHeader: "px-4 py-2 text-left text-md font-bold border border-gray-200",

    tableBody: "px-2.5 py-2.5 text-sm border border-gray-200",

    TableTopIcons: "text-2xl",
  };

  const handleCheckBox = (id: string | number) => {
    setSelectedRow((prev) =>
      prev.includes(id) ? prev.filter((val) => val !== id) : [...prev, id]
    );
  };

  const handleAllCheckbox = () => {
    if (selectedRow?.length === allData.length) {
      setSelectedRow([]); //unselect All
    } else {
      setSelectedRow(() => allData.map((val) => val.id));
    }
  };

  const handleSelectedDelete = () => {
    const res = allData.filter((val) => !selectedRow.includes(val.id));
    setAllData(res);
    localStorage.setItem("snippets", JSON.stringify(res));

    setSelectedRow([]);
    showToast("Selected snippets deleted successfully", "success");
  };

  const handleSelectedFav = () => {
    const res = allData.map((val) =>
      selectedRow.includes(val.id) ? { ...val, isFav: true } : val
    );
    setAllData(res);
    localStorage.setItem("snippets", JSON.stringify(res));
    showToast("Selected snippets set as favourite successfully", "success");
  };

  const handleLeft = () => {
    currentPage >= totalPages && setCurrentPage((prev) => prev - 1);
  };

  const handleRight = () => {
    currentPage < totalPages && setCurrentPage((prev) => prev + 1);
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-300">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div>
      {selectedRow.length > 1 && (
        <>
          <TooltipWrapper
            title="Delete selected snippets"
            placement="bottom"
            className="cursor-pointer ml-3"
          >
            <MdDelete
              className={useStyle.TableTopIcons}
              onClick={handleSelectedDelete}
            />
          </TooltipWrapper>
          <TooltipWrapper
            title="Mark selected snippets as favourite"
            placement="bottom"
            className="cursor-pointer ml-5"
          >
            <FaStar
              className={useStyle.TableTopIcons}
              onClick={handleSelectedFav}
            />
          </TooltipWrapper>
        </>
      )}

      <div className="overflow-x-auto border border-gray-200 ">
        <table className="min-w-full border border-gray-200 rounded-md shadow-sm overflow-hidden">
          <thead
            className={`${theme === "light" ? "bg-gray-100" : "text-white"} `}
          >
            <tr>
              <th className={`${useStyle.tableBody} text-center w-[4%]`}>
                <input
                  type="checkbox"
                  checked={selectedRow?.length === allData.length}
                  onChange={handleAllCheckbox}
                />
              </th>
              <th className={`${useStyle.TableHeader} w-[10%] min-w-[120px]`}>
                Title
              </th>
              <th className={`${useStyle.TableHeader} w-[10%] min-w-[120px]`}>
                Language
              </th>
              <th className={`${useStyle.TableHeader} w-[40%] min-w-[250px]`}>
                AI Insights
              </th>
              <th className={`${useStyle.TableHeader} w-[12%] min-w-[150px]`}>
                Tags
              </th>
              {/* <th className={`${useStyle.TableHeader} w-[3%]`}>Optimised</th> */}
              <th className={`${useStyle.TableHeader} w-[12%] min-w-[150px]`}>
                Created On
              </th>
              <th className={`${useStyle.TableHeader} w-[13%] min-w-[160px]`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className={`${theme === "light" ? "bg-white" : "text-gray-200"} `}
          >
            {snippets.slice(start, end).map((snippet) => {
              const {
                id,
                title,
                language,
                AIInsights,
                tags,
                dateCreated,
                isFav,
              } = snippet;
              return (
                <tr
                  key={id}
                  className={`${theme === "light" ? "hover:bg-gray-100 " : "hover:bg-gray-900 "} transition-colors`}
                >
                  <td className={`${useStyle.tableBody} text-center`}>
                    <input
                      type="checkbox"
                      checked={selectedRow.includes(id)}
                      onChange={() => handleCheckBox(id)}
                    />
                  </td>
                  <td className={useStyle.tableBody}>
                    <div className="line-clamp-3">
                      {highlightText(capitalize(title), searchInput)}
                    </div>
                  </td>
                  <td className={useStyle.tableBody}>
                    {highlightText(capitalize(language), searchInput)}
                  </td>
                  <td className={useStyle.tableBody}>
                    <div className="line-clamp-3">
                      {highlightText(capitalize(AIInsights), searchInput)}
                    </div>
                  </td>
                  <td className={useStyle.tableBody}>
                    <div className="flex flex-wrap gap-1 overflow-hidden">
                      {tags.map((tag: any) => {
                        const bgColor = getColorForTag(tag);
                        return (
                          <StyledTag key={tag.id} bgcolor={bgColor}>
                            <span key={tag.id}>
                              {highlightText(capitalize(tag.name), searchInput)}
                            </span>
                          </StyledTag>
                        );
                      })}
                    </div>
                  </td>
                  {/* <td className={`${useStyle.tableBody} text-center`}>
                {snippet.optimisationRequired ? "No" : "Yes"}
              </td> */}
                  <td className={`${useStyle.tableBody} text-center`}>
                    {dateCreated}
                  </td>
                  <td className="px-1 text-sm text-center border border-gray-200">
                    <span className="flex justify-around">
                      <TooltipWrapper
                        title={`${isFav ? "Unmark as favourite" : "Mark as favourite"}`}
                        arrow
                      >
                        <button
                          onClick={() => handleFav(id)}
                          className="text-black-800 px-1.5 rounded text-lg cursor-pointer"
                        >
                          {!isFav ? (
                            <FaRegStar />
                          ) : (
                            <FaStar style={{ color: "#f4d35e" }} />
                          )}
                        </button>
                      </TooltipWrapper>
                      <TooltipWrapper title="View Snippet" arrow>
                        <button
                          onClick={() => handleView(snippet)}
                          className=" text-yellow-800 px-1.5 rounded text-lg cursor-pointer"
                        >
                          <FaEye style={{ color: "#003F88" }} />
                        </button>
                      </TooltipWrapper>
                      <TooltipWrapper title="Edit Snippet" arrow>
                        <button
                          onClick={() => handleEdit(snippet)}
                          className=" text-yellow-800 px-1.5 rounded text-lg cursor-pointer"
                        >
                          <FaEdit />
                        </button>
                      </TooltipWrapper>

                      <TooltipWrapper title="Delete Snippet" arrow>
                        <button
                          onClick={() => handleDelete(id)}
                          className=" text-red-800 px-1.5 rounded text-lg cursor-pointer"
                        >
                          <MdDelete />
                        </button>
                      </TooltipWrapper>
                    </span>
                  </td>
                </tr>
              );
            })}
            {snippets.length === 0 && (
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
      {/* Tab;e Page setting */}
      <div className="float-right py-3 mb-4 flex items-center">
        <span className="flex items-center mr-10">
          <p className="mr-3">Snippets per page:</p>

          <select
            value={snippetPerPage}
            onChange={(e) => setSnippetPerPage(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </span>
        <Button onClick={handleLeft} disabled={currentPage == 1}>
          <FaChevronLeft />
        </Button>
        <span className="font-semibold">{`${currentPage} of ${totalPages}`}</span>
        <Button onClick={handleRight} disabled={currentPage === totalPages}>
          <FaChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default SnippetList;
