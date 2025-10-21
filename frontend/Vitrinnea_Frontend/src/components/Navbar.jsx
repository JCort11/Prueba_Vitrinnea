// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="w-full bg-white/60 backdrop-blur-sm shadow-sm">
      <div className="container-sm flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center text-white font-bold">V</div>
          <div className="text-lg font-semibold">Vitrinnea</div>
        </Link>

        <nav className="flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login" className="px-3 py-1 text-sm text-primary-500">Login</Link>
              <Link to="/register" className="btn btn-primary text-sm">Register</Link>
            </>
          ) : (
            <>
              <Link to="/tasks" className="text-sm text-muted-500">My tasks</Link>
              <button onClick={() => { if(confirm('Cerrar sesión?')) logout(); }} className="btn btn-ghost text-sm">Cerrar sesión</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
