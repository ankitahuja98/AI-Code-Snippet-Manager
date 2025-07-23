import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import type { Snippet } from "../types/addSnippet";

const Dashboard = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("snippets") || "[]");
    setSnippets(data);
  }, []);

  // Card summaries
  const totalSnippets = snippets.length;
  const recentSnippets = snippets.slice(-8).reverse();

  // Top tags
  const tagCounts: { [tag: string]: number } = {};
  snippets.forEach((snippet) =>
    (snippet.tags || []).forEach(
      (tag) => (tagCounts[tag.name] = (tagCounts[tag.name] || 0) + 1)
    )
  );
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag]) => tag);

  // Top languages
  const languageCounts: { [lang: string]: number } = {};
  snippets.forEach((snippet) => {
    const lang = snippet.language || "other";
    languageCounts[lang] = (languageCounts[lang] || 0) + 1;
  });
  const languagesUsed = Object.keys(languageCounts);

  // Pie data for language distribution
  const pieChartData = Object.entries(languageCounts).map(([lang, value]) => ({
    label: lang,
    value,
  }));

  // Simple line chart mock for demo
  const timeLabels = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const timeSeries = [2, 2, 3, 4, 3, 4, 5, 6];

  return (
    <div className="h-screen w-full bg-white text-black overflow-y-auto">
      {/* Responsive header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 p-4 sm:p-8 bg-white">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="contained"
            sx={{ backgroundColor: "#2563eb", boxShadow: "none" }}
          >
            Create New Snippet
          </Button>
          <Button variant="outlined" sx={{ boxShadow: "none" }}>
            Browse Snippets
          </Button>
        </div>
      </div>

      {/* Cards Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-8 mb-4">
        <div className="bg-white border rounded-lg px-4 py-3 min-w-[140px]">
          <div className="text-gray-500 text-sm mb-1">Total Snippets</div>
          <div className="text-2xl sm:text-3xl font-semibold">
            {totalSnippets}
          </div>
        </div>
        <div className="bg-white border rounded-lg px-4 py-3 min-w-[140px]">
          <div className="text-gray-500 text-sm mb-1">Recent Snippets</div>
          <div className="text-2xl sm:text-3xl font-semibold">
            {recentSnippets.length}
          </div>
        </div>
        <div className="bg-white border rounded-lg px-4 py-3 min-w-[140px]">
          <div className="text-gray-500 text-sm mb-1">Top Tags</div>
          <div className="flex gap-2 pt-1 flex-wrap">
            {topTags.length === 0 ? (
              <span className="text-gray-400 text-sm">No tags</span>
            ) : (
              topTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 rounded-md font-medium text-gray-700 text-sm"
                >
                  {tag}
                </span>
              ))
            )}
          </div>
        </div>
        <div className="bg-white border rounded-lg px-4 py-3 min-w-[140px]">
          <div className="text-gray-500 text-sm mb-1">Languages Used</div>
          <div className="flex gap-2 pt-1 flex-wrap">
            {languagesUsed.length === 0 ? (
              <span className="text-gray-400 text-sm">No languages</span>
            ) : (
              languagesUsed.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 bg-gray-100 rounded-md font-medium text-gray-700 text-sm"
                >
                  {lang}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Charts Row - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 sm:px-8 mb-6">
        {/* Pie Chart */}
        <div className="bg-white border rounded-lg p-4 flex flex-col">
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
                  },
                ]}
                width={210}
                height={210}
              />
              <div className="ml-0 mt-4 md:mt-0 md:ml-8">
                {pieChartData.map((item, i) => (
                  <div key={item.label} className="flex items-center mb-2">
                    <span
                      className="w-3 h-3 rounded-full mr-2"
                      style={{
                        backgroundColor:
                          "#3366cc" /* just one color per legend; see note below */,
                      }}
                    />
                    <span className="text-gray-700 mr-2">{item.label}</span>
                    <span className="text-gray-400">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <span className="text-gray-400 text-sm">No data</span>
          )}
        </div>
        {/* Line Chart */}
        <div className="bg-white border rounded-lg p-4 flex flex-col">
          <div className="font-semibold mb-3">Snippets Over Time</div>
          <div className="overflow-x-auto">
            <LineChart
              xAxis={[{ data: timeLabels }]}
              series={[{ data: timeSeries, showMark: false, area: false }]}
              width={320}
              height={200}
            />
          </div>
        </div>
      </div>

      {/* Responsive, Scrollable Table */}
      <div className="px-4 sm:px-8 pb-8">
        <div className="text-xl font-semibold mb-2">Recent Snippets</div>
        <div className="bg-white border rounded-lg overflow-x-auto">
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
              {recentSnippets.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-4 text-center text-gray-400"
                    colSpan={5}
                  >
                    No snippets found
                  </td>
                </tr>
              )}
              {recentSnippets.map((s, idx) => (
                <tr
                  key={s.id || idx}
                  className={idx % 2 === 0 ? "bg-gray-50" : ""}
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
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
