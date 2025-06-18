import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import CreateSnippet from "./pages/CreateSnippet";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create" element={<CreateSnippet />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
