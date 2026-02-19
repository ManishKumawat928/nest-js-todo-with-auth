import { motion } from "framer-motion";
import { LayoutDashboard, Sun, Moon } from "lucide-react";

export default function Sidebar({ dark, setDark }) {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      className="w-64 h-screen bg-white/10 backdrop-blur-xl p-6 hidden md:block"
    >
      <h2 className="text-xl font-bold mb-10">🚀 SaaS Todo</h2>

      <div className="flex items-center gap-3 mb-6 cursor-pointer hover:text-purple-400">
        <LayoutDashboard size={18} />
        Dashboard
      </div>

      <div
        onClick={() => setDark(!dark)}
        className="flex items-center gap-3 cursor-pointer hover:text-purple-400"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
        Toggle Mode
      </div>
      <div
        onClick={logout}
        className="flex items-center gap-3 mt-6 cursor-pointer hover:text-red-400"
      >
        Logout
      </div>

    </motion.div>
  );
}
