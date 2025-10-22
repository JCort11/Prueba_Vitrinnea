import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../images/logo.webp"

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="w-full bg-white/60 backdrop-blur-sm shadow-sm">
      <div className="container-sm flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Vitrinnea logo"
            className="w-9 h-9 object-contain rounded-lg"
          />
          <span className="text-lg font-semibold text-gray-800">Vitrinnea</span>
        </Link>

        <nav className="flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login" className="px-3 py-1 text-sm text-primary-500">Login</Link>
              <Link to="/register" className="btn btn-primary text-sm px-3 py-1">Register</Link>
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
