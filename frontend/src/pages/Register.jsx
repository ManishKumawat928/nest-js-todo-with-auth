import { useState } from "react";
import API from "../api/axios";

export default function Register({ goLogin }) {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const [success,setSuccess]=useState("");

  const handleRegister = async ()=>{
    try{
      setLoading(true);
      setError("");
      setSuccess("");

      await API.post("/v1/auth/register",{name,email,password});

      setSuccess("Account created. Please login.");

    }catch(err){
      setError(err?.response?.data?.message || "Register failed");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-2 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/20 text-green-300 p-2 rounded mb-4">
            {success}
          </div>
        )}

        <input
          placeholder="Name"
          className="w-full mb-3 px-4 py-2 rounded-xl bg-white/20"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 rounded-xl bg-white/20"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 rounded-xl bg-white/20"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={handleRegister}
          className="w-full bg-indigo-600 py-2 rounded-xl"
        >
          {loading ? "Loading..." : "Register"}
        </button>

        <p
          onClick={goLogin}
          className="text-center mt-4 cursor-pointer text-purple-300"
        >
          Back to login
        </p>
      </div>
    </div>
  );
}
