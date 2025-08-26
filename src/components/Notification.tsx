import { motion, AnimatePresence } from "framer-motion";

export default function Notification() {
  return (
    <div className="absolute top-0 right-0 h-full w-50 bg-amber-300 shadow-lg p-4">
      <h2 className="text-lg font-bold mb-2">Notifications</h2>
      <p>Hello 👋</p>
    </div>
  );
}
