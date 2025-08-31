import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Snippet } from "../types/addSnippet";
import { useLocation } from "react-router-dom";

interface SnippetContextType {
  snippetToEdit: Snippet | null;
  setSnippetToEdit: (snippet: Snippet | null) => void;
}

const EditSnippetContext = createContext<SnippetContextType | undefined>(
  undefined
);

export function EditSnippetProvider({ children }: { children: ReactNode }) {
  const [snippetToEdit, setSnippetToEdit] = useState<Snippet | null>(null);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const isEdit = location.pathname.startsWith("/addSnippet");
    const isView = location.pathname.startsWith("/viewSnippet");
    const onTarget = isEdit || isView;

    const prev = prevPathRef.current;
    const wasEdit = prev.startsWith("/addSnippet");
    const wasView = prev.startsWith("/viewSnippet");
    const switchedBetween = (isEdit && wasView) || (isView && wasEdit);

    if (!onTarget || switchedBetween) {
      setSnippetToEdit(null);
    }

    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  return (
    <EditSnippetContext.Provider value={{ snippetToEdit, setSnippetToEdit }}>
      {children}
    </EditSnippetContext.Provider>
  );
}

//Custom Hook
export const useSnippetContext = () => {
  const context = useContext(EditSnippetContext);
  if (!context) {
    throw new Error(
      "useSnippetContext must be used within EditSnippetProvider"
    );
  }
  return context;
};
