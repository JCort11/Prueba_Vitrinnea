
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../images/logo.webp"; 

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [hovered, setHovered] = useState(null);

  return (
    <header className="w-full bg-white/70 backdrop-blur-sm shadow-sm">
      <div className="container-sm flex items-center justify-between py-3">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Vitrinnea logo"
            className="w-9 h-9 object-contain rounded-lg"
          />
          <span className="text-lg font-semibold text-gray-800">
            Vitrinnea
          </span>
        </Link>

        {/* NAV OPTIONS */}
        <nav className="flex items-center gap-3">
          {!user ? (
            <>
              {/* LOGIN */}
              <Link
                to="/login"
                onMouseEnter={() => setHovered("login")}
                onMouseLeave={() => setHovered(null)}
                className={`px-3 py-1 text-sm rounded-lg font-medium border transition-colors duration-200 ${
                  hovered === "register"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
              >
                Iniciar sesión
              </Link>

              {/* REGISTER */}
              <Link
                to="/register"
                onMouseEnter={() => setHovered("register")}
                onMouseLeave={() => setHovered(null)}
                className={`px-3 py-1 text-sm rounded-lg font-medium border transition-colors duration-200 ${
                  hovered === "login"
                    ? "bg-white text-blue-600 border-blue-600"
                    : "bg-blue-600 text-white border-blue-600 hover:bg-white hover:text-blue-600"
                }`}
              >
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/tasks"
                className="text-sm text-gray-600 hover:text-primary-500"
              >
                Mis tareas
              </Link>
              <button
                onClick={() => {
                  if (confirm("¿Cerrar sesión?")) logout();
                }}
                className="px-3 py-1 text-sm font-medium border rounded-lg bg-transparent hover:bg-red-600 hover:text-white transition"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
