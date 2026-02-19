import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [dark, setDark] = useState(true);

  const [page, setPage] = useState(
    localStorage.getItem("token") ? "dashboard" : "login"
  );

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">

        {/* ⭐ PAGE SWITCH */}
        {page === "login" && (
          <Login
            onLogin={() => setPage("dashboard")}
            goRegister={() => setPage("register")}
          />
        )}

        {page === "register" && (
          <Register goLogin={() => setPage("login")} />
        )}

        {page === "dashboard" && (
          <Dashboard dark={dark} setDark={setDark} />
        )}

      </div>
    </div>
  );
}

export default App;
