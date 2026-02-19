import { motion } from "framer-motion";
import { Trash2, Pencil, CheckCircle } from "lucide-react";

export default function TodoCard({ todo, deleteTodo, onEdit, onToggle }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl shadow-xl"
        >
            <h2 className="text-lg font-semibold mb-2">
                {todo.title}
            </h2>

            <p className="text-sm text-gray-300 mb-4">
                {todo.description}
            </p>

            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                    {new Date(todo.createdAt).toLocaleDateString()}
                </span>

                <div className="flex gap-3 items-center">

                    {/* TOGGLE BUTTON */}
                    <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => onToggle(todo._id, todo.isCompleted)}
                        className={todo.isCompleted ? "text-green-400" : "text-gray-400"}
                    >
                        <CheckCircle size={20} />
                    </motion.button>

                    {/* EDIT */}
                    <button onClick={onEdit} className="text-blue-400">
                        <Pencil size={18} />
                    </button>

                    {/* DELETE */}
                    <motion.button
                        whileHover={{ rotate: 15 }}
                        onClick={() => deleteTodo(todo._id)}
                        className="text-red-400"
                    >
                        <Trash2 size={18} />
                    </motion.button>
                </div>


            </div>
        </motion.div>
    );
}
