import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, type RefObject } from "react";
import type { Variants } from "framer-motion";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import TooltipWrapper from "./TooltipWrapper";

// 👇 Accept props
interface TopBarProps {
  editorRef: RefObject<HTMLDivElement> | null;
}

export default function SideBar({
  isOpen,
  setIsOpen,
  editorRef,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editorRef: RefObject<HTMLDivElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);
  const location = useLocation();

  return (
    <div>
      <motion.nav
        ref={containerRef}
        initial={false}
        animate={{ width: isOpen ? 200 : 60 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={nav}
      >
        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={sidebarVariants}
          custom={height || 400}
        />

        <MenuToggle toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
        <Navigation
          isOpen={isOpen}
          currentPath={location.pathname}
          editorRef={editorRef}
        />
      </motion.nav>
    </div>
  );
}

const menuItems = [
  { id: 0, name: "Dashboard", path: "/", icon: DashboardIcon },
  { id: 1, name: "Create Snippet", path: "/create", icon: AddBoxIcon },
  { id: 2, name: "Library", path: "/library", icon: LibraryBooksIcon },
];

const Navigation = ({
  isOpen,
  currentPath,
  editorRef,
}: {
  isOpen: boolean;
  currentPath: string;
  editorRef: RefObject<HTMLDivElement | null>;
}) => (
  <ul style={list}>
    {menuItems.map((item) => (
      <MenuItem
        key={item.id}
        name={item.name}
        path={item.path}
        icon={item.icon}
        isOpen={isOpen}
        currentPath={currentPath}
        editorRef={editorRef}
      />
    ))}
  </ul>
);

const MenuItem = ({
  key,
  name,
  path,
  icon: Icon,
  isOpen,
  currentPath,
  editorRef,
}: {
  key: number;
  name: string;
  path: string;
  icon: React.ElementType;
  isOpen: boolean;
  currentPath: string;
  editorRef: RefObject<HTMLDivElement | null>;
}) => {
  const listItem: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: 10,
    backgroundColor: currentPath === path ? "#f4d35e" : "",
    color: currentPath === path ? "black" : "white",
    width: "100%",
  };
  return (
    <Link
      key={key}
      to={path}
      className={`block p-2 rounded flex align-middle `}
    >
      <li style={listItem} className={`p-1 rounded-lg`}>
        <TooltipWrapper
          title={name}
          arrow
          PopperProps={{
            container: editorRef.current,
          }}
        >
          <Icon style={iconPlaceholder} />

          {/* Animate label visibility */}
          <AnimatePresence>
            {isOpen && (
              <motion.span
                style={textLabel}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {name}
              </motion.span>
            )}
          </AnimatePresence>
        </TooltipWrapper>
      </li>
    </Link>
  );
};

const sidebarVariants: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#FFFFFF"
    strokeLinecap="round"
    {...props}
  />
);

interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ toggle, isOpen }) => {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle menu"
      style={{ width: "61px" }}
      className="p-2 text-white transition-colors duration-200 cursor-pointer"
    >
      {isOpen ? (
        <MenuOpenIcon fontSize="large" style={{ color: "white" }} />
      ) : (
        <MenuIcon fontSize="large" style={{ color: "white" }} />
      )}
    </button>
  );
};

// Styles

const nav: React.CSSProperties = {
  height: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#00296b",
  color: "white",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  overflow: "hidden",
};

const toggleContainer: React.CSSProperties = {
  outline: "none",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",
  cursor: "pointer",
  position: "absolute",
  top: 4,
  left: 5,
  width: 50,
  height: 50,
  borderRadius: "50%",
  zIndex: 10,
};

const list: React.CSSProperties = {
  listStyle: "none",
  //   padding: 9,
  margin: 0,
  marginTop: 10,
  display: "flex",
  flexDirection: "column",
};

const iconPlaceholder: React.CSSProperties = {
  width: 25,
  height: 25,
  borderRadius: "50%",
  flexShrink: 0,
  marginRight: 12,
};

const textLabel: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 500,
  whiteSpace: "nowrap",
  userSelect: "none",
};

// Utility Hook for dimensions (optional)
const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
};
