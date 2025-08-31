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

  // Top languages
  const languageCounts: { [lang: string]: number } = {};
  snippets.forEach((snippet) => {
    const lang = snippet.language || "other";
    languageCounts[lang] = (languageCounts[lang] || 0) + 1;
  });

  // Pie data for language distribution
  const pieChartData = Object.entries(languageCounts).map(([lang, value]) => ({
    label: lang,
    value,
  }));

  const favSnippets = snippets.filter((val) => val.isFav);

  // Simple line chart mock for demo
  const timeLabels = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const timeSeries = [2, 2, 3, 4, 3, 4, 5, 6];

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
            {snippets?.length || 0}
          </div>
        </div>
        <div className="border rounded-lg px-4 py-3 min-w-[140px]">
          <div
            className={`${theme === "light" ? "text-gray-500" : "text-white"} text-sm mb-1`}
          >
            Favourite Snippets
          </div>
          <div className="text-2xl sm:text-3xl font-semibold">
            {favSnippets?.length || 0}
          </div>
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
              <span className="text-sm">No languages</span>
            ) : (
              langUsed.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1  rounded-md font-medium text-sm"
                >
                  {capitalize(lang)}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Charts Row - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-7">
        {/* Pie Chart */}
        <div className=" border rounded-lg p-4 flex flex-col">
          <div className="font-semibold mb-3">Language Distribution</div>
          {pieChartData.length > 0 ? (
            <div className="flex flex-col md:flex-row items-center">
              <PieChart
                series={[
                  {
                    data: pieChartData,
                    innerRadius: 45,
                    outerRadius: 80,
                    paddingAngle: 4,
                    cornerRadius: 6,
                    arcLabel: (item) => `${item.value}`, // shows count
                    arcLabelMinAngle: 10, // only show labels if slice is big enough
                  },
                ]}
                sx={{
                  // arc labels (inside the pie slices)
                  "& .MuiChartsArcLabel-root": {
                    fill: theme === "light" ? "#6B7280" : "#ffffff",
                    fontWeight: 600,
                    fontSize: "15px", // increase font size
                    textTransform: "capitalize", // first char uppercase
                  },
                  // legend labels (outside the pie chart)
                  "& .MuiChartsLegend-root": {
                    color: theme === "light" ? "#6B7280" : "#ffffff",
                    fontWeight: 500,
                    fontSize: "15px", // increase font size
                    textTransform: "capitalize", // first char uppercase
                  },
                }}
                width={210}
                height={210}
              />
            </div>
          ) : (
            <span className=" text-sm">No data</span>
          )}
        </div>
        {/* Line Chart */}
        <div className=" border rounded-lg p-4 flex flex-col">
          <div className="font-semibold mb-3">Snippets Over Time</div>
          <div className="overflow-x-auto">
            <LineChart
              xAxis={[
                {
                  data: timeLabels,
                  label: "time", // axis label text
                },
              ]}
              series={[
                {
                  data: timeSeries,
                  showMark: false,
                  area: false,
                  label: "visits", // legend label
                  color: theme === "light" ? "#3b82f6" : "#f4d35e", // 👈 dynamic line color
                },
              ]}
              sx={{
                // axis labels (x & y)
                "& .MuiChartsAxis-label": {
                  fill: theme === "light" ? "#6B7280" : "#ffffff",
                  fontWeight: 600,
                  fontSize: "14px",
                  textTransform: "capitalize",
                },
                // tick labels (axis values)
                "& .MuiChartsAxis-tickLabel": {
                  fill: theme === "light" ? "#6B7280" : "#ffffff",
                  fontSize: "13px",
                },
                // legend text
                "& .MuiChartsLegend-root": {
                  color: theme === "light" ? "#6B7280" : "#ffffff",
                  fontWeight: 500,
                  fontSize: "14px",
                  textTransform: "capitalize",
                },
                // 👇 axis line (the black line you mentioned)
                "& .MuiChartsAxis-line": {
                  stroke: theme === "light" ? "#6B7280" : "#ffffff",
                },
              }}
              width={320}
              height={200}
            />
          </div>
        </div>
      </div>

      {/* Responsive, Scrollable Table */}
      <div className="mt-7">
        <div className="text-xl font-semibold mb-2">Favourite Snippets</div>
        <div className=" border rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-medium">Title</th>
                <th className="px-4 py-2 text-left font-medium">Language</th>
                <th className="px-4 py-2 text-left font-medium">
                  Date Created
                </th>
                <th className="px-4 py-2 text-left font-medium">Tags</th>
                <th className="px-4 py-2 text-left font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {favSnippets.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-4 text-center text-gray-400"
                    colSpan={5}
                  >
                    No snippets found
                  </td>
                </tr>
              )}
              {favSnippets.map((s, idx) => (
                <tr
                  key={s.id || idx}
                  // className={idx % 2 === 0 ? "bg-gray-50" : ""}
                >
                  <td className="px-4 py-2">{s.title}</td>
                  <td className="px-4 py-2 capitalize">{s.language}</td>
                  <td className="px-4 py-2">{s.dateCreated}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-1 flex-wrap">
                      {(s.tags || []).length === 0 ? (
                        <span className="text-gray-400 text-xs">No tags</span>
                      ) : (
                        s.tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="px-2 py-1 bg-gray-100 rounded text-gray-700 text-xs"
                          >
                            {tag.name}
                          </span>
                        ))
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ textTransform: "none" }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
