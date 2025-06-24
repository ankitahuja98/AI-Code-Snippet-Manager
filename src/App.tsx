import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import CreateSnippet from "./pages/CreateSnippet";
import SideBar from "./components/SideBar";
import { useState } from "react";
import TopBar from "./components/TopBar";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateSnippet />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
