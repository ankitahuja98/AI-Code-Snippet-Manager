import { motion } from "framer-motion";
import { useRef } from "react";

export default function Notification({
  NotificationIsOpen,
}: {
  NotificationIsOpen: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.nav
      ref={containerRef}
      initial={false}
      animate={{ width: NotificationIsOpen ? 200 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={nav(NotificationIsOpen)}
    >
      <div>
        <h2 className="text-lg font-bold mb-2">Notifications</h2>
        <p>Hello 👋</p>
      </div>
    </motion.nav>
  );
}

// Styles

// Styles
const nav = (NotificationIsOpen: boolean): React.CSSProperties => ({
  height: "100%",
  position: "fixed",
  top: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  color: "black",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  overflow: "hidden",
  padding: NotificationIsOpen ? "10px" : "",
  zIndex: "100",
});
