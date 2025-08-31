import { useState } from "react";
import SnippetList from "../components/SnippetList";
import { FaSearch } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { IoMdAddCircle } from "react-icons/io";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  const HandleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const navigate = useNavigate();

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-center items-center border border-gray-400 py-1 px-3 rounded-2xl">
          <FaSearch style={{ color: "#A3A3A3" }} />
          <input
            type="text"
            className="px-1.5 outline-none"
            value={searchInput}
            placeholder="Search..."
            onChange={HandleSearchInputChange}
          />
          <RxCross1
            style={{
              fontSize: "12px",
              color: searchInput && "#A3A3A3",
              display: !searchInput ? "none" : "block",
              cursor: "pointer",
            }}
            onClick={() => setSearchInput("")}
          />
        </div>
        <Button
          type="button"
          variant="contained"
          className="mt-4 px-6 py-2 rounded-xl text-white bg-gradient-to-r from-[#003F88] via-[#602080] to-[#9D4EDD] hover:brightness-110 shadow-lg hover:shadow-xl transition duration-300 relative overflow-hidden"
        >
          <span
            className="font-bold flex items-center text-xs sm:text-sm"
            onClick={() => navigate("/addSnippet")}
          >
            <IoMdAddCircle className="pr-2 text-2xl" /> New Snippet
          </span>
        </Button>
      </div>
      <SnippetList searchInput={searchInput} />
    </main>
  );
};

export default Library;
