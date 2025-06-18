import Sidebar from "../components/SideBar";
import SnippetList from "../components/SnippetList";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">My Snippets</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + New Snippet
          </button>
        </div>
        <SnippetList />
      </main>
    </div>
  );
};

export default Dashboard;
