import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import CreateSnippet from "./pages/CreateSnippet";
import SideBar from "./components/SideBar";
import { useRef, useState } from "react";
import TopBar from "./components/TopBar";
import Library from "./pages/Library";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-screen" ref={editorRef}>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} editorRef={editorRef} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar editorRef={editorRef} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateSnippet />} />
          <Route path="/library" element={<Library />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
