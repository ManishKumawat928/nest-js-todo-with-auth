import { motion } from "framer-motion";

export default function StatsCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl"
    >
      <h3 className="text-gray-300">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  );
}
