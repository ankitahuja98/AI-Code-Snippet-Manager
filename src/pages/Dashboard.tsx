import React, { useEffect, useState } from "react";
import { Button, capitalize, Container } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import type { Snippet } from "../types/addSnippet";
import { IoMdAddCircle } from "react-icons/io";
import { IoListCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

const Dashboard = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const tags = snippets;
  let navigate = useNavigate();
  let { theme } = useTheme();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("snippets") || "[]");
    setSnippets(data);
  }, []);

  const TagCount: { [tag: string]: number } = {};

  snippets.forEach((val) =>
    val.tags?.forEach((tag) => {
      TagCount[tag.name] ? (TagCount[tag.name] += 1) : (TagCount[tag.name] = 1);
    })
  );

  const toptags = Object.entries(TagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map((val) => val[0]);

  const langUsed: string[] = Array.from(
    new Set(snippets.map((val) => val.language))
  );

  console.log(langUsed);

  return (
    <main
      className="p-6 pt-3 h-screen overflow-auto"
      style={{
        color: theme == "light" ? "text-black" : "text-white",
        backgroundColor: theme === "light" ? "bg-white" : "bg-black",
      }}
    >
      {/* Header */}
      <div className="DashboardHeader flex justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold">Dashboard</h1>
        <div>
          <Button
            type="button"
            variant="contained"
            className="mt-4 px-6 py-2 rounded-xl text-white bg-gradient-to-r from-[#003F88] via-[#602080] to-[#9D4EDD] hover:brightness-110 shadow-lg hover:shadow-xl transition duration-300 relative overflow-hidden"
            style={{ marginRight: "1rem" }}
          >
            <span
              className="font-bold flex items-center text-xs sm:text-sm"
              onClick={() => navigate("/addSnippet")}
            >
              <IoMdAddCircle className="pr-2 text-2xl" /> New Snippet
            </span>
          </Button>
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
      </div>
      {/* Cards */}
      <div className="firstSection grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
        <div className="border rounded-lg px-4 py-3 min-w-[140px]">
          <div
            className={`${theme === "light" ? "text-gray-500" : "text-white"} text-sm mb-1`}
          >
            Total Snippets
          </div>
          <div className="text-2xl sm:text-3xl font-semibold">
            {snippets.length}
          </div>
        </div>
        <div className="border rounded-lg px-4 py-3 min-w-[140px]">
          <div
            className={`${theme === "light" ? "text-gray-500" : "text-white"} text-sm mb-1`}
          >
            Favourite Snippets
          </div>
          <div className="text-2xl sm:text-3xl font-semibold"></div>
        </div>
        <div className=" border rounded-lg px-4 py-3 min-w-[140px]">
          <div
            className={`${theme === "light" ? "text-gray-500" : "text-white"} text-sm mb-1`}
          >
            Top Tags
          </div>
          <div className="flex gap-2 pt-1 flex-wrap">
            {toptags.length === 0 ? (
              <span className="text-gray-400 text-sm">No tags</span>
            ) : (
              toptags.map((tag) => {
                return (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-200 rounded-md font-medium text-gray-700 text-sm"
                  >
                    {capitalize(tag)}
                  </span>
                );
              })
            )}
          </div>
        </div>
        <div className=" border rounded-lg px-4 py-3 min-w-[140px]">
          <div
            className={`${theme === "light" ? "text-gray-500" : "text-white"} text-sm mb-1`}
          >
            Languages Used
          </div>
          <div className="flex gap-2 pt-1 flex-wrap">
            {langUsed.length === 0 ? (
              <span className="text-gray-400 text-sm">No languages</span>
            ) : (
              langUsed.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 bg-gray-100 rounded-md font-medium text-gray-700 text-sm"
                >
                  {capitalize(lang)}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-7">
        {/* Pie Chart */}
        <div className=" border rounded-lg p-4 flex flex-col">
          <div className="font-semibold mb-3">Language Distribution</div>

          <div className="flex flex-col md:flex-row items-center">
            <PieChart
              series={[
                {
                  data: [],
                  innerRadius: 45,
                  outerRadius: 80,
                  paddingAngle: 4,
                  cornerRadius: 6,
                },
              ]}
              width={210}
              height={210}
            />
          </div>
        </div>
        {/* Line Chart */}
        <div className=" border rounded-lg p-4 flex flex-col">
          <div className="font-semibold mb-3">Snippets Over Time</div>
          <div className="overflow-x-auto">
            <LineChart
              xAxis={[{ data: [] }]}
              series={[{ data: [], showMark: false, area: false }]}
              width={320}
              height={200}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
