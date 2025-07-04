import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import CreateSnippet from "./pages/CreateSnippet";
import SideBar from "./components/SideBar";
import { useRef, useState } from "react";
import TopBar from "./components/TopBar";
import Library from "./pages/Library";
import { ThemeContextProvider } from "./Context/ThemeContext";
import Toast from "./utils/Toast";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  return (
    <ThemeContextProvider>
      <div className="flex h-screen" ref={editorRef}>
        <Toast />
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} editorRef={editorRef} />
        <div className="flex-1 flex flex-col rounded-tl-3xl theme-wrapper">
          <TopBar editorRef={editorRef} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/addSnippet" element={<CreateSnippet />} />
            <Route path="/library" element={<Library />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </ThemeContextProvider>
  );
}

export default App;
