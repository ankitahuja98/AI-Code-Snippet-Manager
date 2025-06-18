import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SettingsIcon from "@mui/icons-material/Settings";

const navItems = [
  { id: 0, name: "Dashboard", path: "/", icon: DashboardIcon },
  { id: 1, name: "Create Snippet", path: "/create", icon: AddBoxIcon },
  { id: 2, name: "Settings", path: "/settings", icon: SettingsIcon },
];

const SideBar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">🧠 Snippet AI</h1>
      <nav className="space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`block px-3 py-2 rounded flex align-middle ${
              location.pathname === item.path
                ? "bg-gray-700"
                : "hover:bg-gray-800"
            }`}
          >
            {item.icon && <item.icon className="inline mr-2" />}
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
