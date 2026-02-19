import { useState } from "react";
import API from "../api/axios";

export default function Login({ onLogin, goRegister }) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  const handleLogin = async ()=>{
    try{
      setLoading(true);
      setError("");

      const res = await API.post("/v1/auth/login",{email,password});

      localStorage.setItem("token",res.data.access_token);
      onLogin();

    }catch(err){
      setError(err?.response?.data?.message || "Login failed");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <input
          className="w-full mb-3 px-4 py-2 rounded-xl bg-white/20"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 px-4 py-2 rounded-xl bg-white/20"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={handleLogin}
          className="w-full bg-indigo-600 py-2 rounded-xl"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <p
          onClick={goRegister}
          className="text-center mt-4 cursor-pointer text-purple-300"
        >
          Create account
        </p>
      </div>
    </div>
  );
}
