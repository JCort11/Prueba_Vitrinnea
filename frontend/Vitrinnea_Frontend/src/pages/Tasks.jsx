// src/pages/Tasks.jsx
import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import TaskCard from "../components/TaskCard";
import { AuthContext } from "../context/AuthContext";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logout } = useContext(AuthContext); // <-- usamos logout del contexto

  const loadTasks = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/tasks");
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las tareas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    try {
      await api.post("/tasks", { title: form.title.trim(), description: form.description.trim() });
      setForm({ title: "", description: "" });
      loadTasks();
    } catch (err) {
      console.error(err);
      setError("Error creando tarea");
    }
  };

  const handleDeleted = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggled = (id) => {
    setTasks((prev) => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleUpdated = (updatedTask) => {
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  // Nuevo: función que confirma y ejecuta logout
  const handleLogout = () => {
    const ok = confirm("¿Estás seguro que quieres cerrar sesión?");
    if (!ok) return;
    logout(); // AuthContext se encarga de borrar token y redirigir
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Mis tareas</h1>
          <p className="text-sm text-gray-500">Administra tus tareas personales</p>
        </div>

        <div className="flex gap-3 items-center">
          {/* Botón para refrescar tareas */}
          <button
            onClick={loadTasks}
            className="py-1 px-3 border rounded hover:bg-white"
            title="Refrescar tareas"
          >
            Refresh
          </button>

          {/* Botón de cerrar sesión — aquí lo tienes dentro de la vista de tareas */}
          <button
            onClick={handleLogout}
            className="py-1 px-3 bg-red-600 text-white rounded hover:bg-red-700"
            title="Cerrar sesión"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <form onSubmit={createTask} className="mb-6 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Título de la tarea"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="p-2 border rounded flex-1"
        />
        <input
          type="text"
          placeholder="Descripción (opcional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="p-2 border rounded flex-1"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Crear</button>
      </form>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-3">
          {tasks.length === 0 ? (
            <li className="text-gray-500">No hay tareas aún — crea la primera.</li>
          ) : (
            tasks.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onDeleted={handleDeleted}
                onToggled={handleToggled}
                onUpdated={handleUpdated}
              />
            ))
          )}
        </ul>
      )}
    </div>
  );
}
