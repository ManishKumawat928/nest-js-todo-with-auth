import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import TodoCard from "../components/TodoCard";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function Dashboard({ dark, setDark }) {
  const [todos,setTodos]=useState([]);
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [editingId,setEditingId]=useState(null);
  const [stats,setStats]=useState({});
  const [search,setSearch]=useState("");
  const [page,setPage]=useState(1);

  const fetchStats = async ()=>{
    const res = await API.get("/todo/stats");
    setStats(res.data);
  };

  const fetchTodos = async ()=>{
    const res = await API.get(`/todo/findAll?page=${page}&limit=10`);
    setTodos(res.data.data);
  };

  useEffect(()=>{
    fetchTodos();
    fetchStats();
  },[page]);

  const handleSubmit = async ()=>{
    if(!title) return toast.error("Title required");

    try{
      if(editingId){
        await API.put(`/todo/updateTodo/${editingId}`,{title,description});
        toast.success("Updated");
        setEditingId(null);
      }else{
        await API.post("/todo/create",{title,description});
        toast.success("Created");
      }

      setTitle("");
      setDescription("");
      fetchTodos();
      fetchStats();

    }catch(err){
      toast.error(err?.response?.data?.message || "Error");
    }
  };

  const deleteTodo = async(id)=>{
    try{
      await API.delete(`/todo/deleteTodo/${id}`);
      toast.success("Deleted");
      fetchTodos();
      fetchStats();
    }catch(err){
      toast.error("Delete failed");
    }
  };

  const updateStatus = async(id,current)=>{
    try{
      await API.put(`/todo/updateStatus/${id}`,{isCompleted:!current});
      fetchTodos();
      fetchStats();
    }catch{
      toast.error("Toggle failed");
    }
  };

  const handleSearch = async ()=>{
    if(!search) return fetchTodos();
    const res = await API.get(`/todo/search?search=${search}`);
    setTodos(res.data.data);
  };

  const filterByStatus = async(status)=>{
    const res = await API.get(`/todo/filter?isCompleted=${status}`);
    setTodos(res.data.data);
  };

  return (
    <div className="flex">
      <Sidebar dark={dark} setDark={setDark} />

      <div className="flex-1 p-6">

        <motion.h1 className="text-3xl font-bold mb-6">
          Dashboard
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Total Tasks" value={stats.total} />
          <StatsCard title="Completed" value={stats.completed} />
          <StatsCard title="Pending" value={stats.pending} />
        </div>

        <div className="flex gap-3 mb-6">
          <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search..."
            className="flex-1 px-4 py-2 rounded-xl bg-white/20"
          />
          <button onClick={handleSearch} className="bg-purple-600 px-4 py-2 rounded-xl">
            Search
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button onClick={fetchTodos}>All</button>
          <button onClick={()=>filterByStatus(false)}>Pending</button>
          <button onClick={()=>filterByStatus(true)}>Completed</button>
        </div>

        <div className="bg-white/10 p-6 rounded-2xl mb-8">
          <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full px-4 py-2 mb-3 rounded-xl bg-white/20"
          />
          <textarea
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder="Description"
            className="w-full px-4 py-2 mb-3 rounded-xl bg-white/20"
          />

          <button onClick={handleSubmit} className="bg-indigo-600 px-6 py-2 rounded-xl">
            {editingId ? "Update" : "Add"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todos.map(todo=>(
            <TodoCard
              key={todo._id}
              todo={todo}
              deleteTodo={deleteTodo}
              onEdit={()=>{
                setEditingId(todo._id);
                setTitle(todo.title);
                setDescription(todo.description);
              }}
              onToggle={updateStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
