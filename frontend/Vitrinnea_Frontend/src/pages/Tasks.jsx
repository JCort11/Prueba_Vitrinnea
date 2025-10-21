import { useState, useEffect, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const { logout } = useContext(AuthContext);

  const loadTasks = async () => {
    const { data } = await api.get("/tasks");
    setTasks(data);
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    await api.post("/tasks", form);
    setForm({ title: "", description: "" });
    loadTasks();
  };

  const toggleTask = async (task) => {
    await api.put(`/tasks/${task.id}`, { completed: !task.completed });
    loadTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Mis tareas</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </header>

      <form onSubmit={createTask} className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Título de la tarea"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="p-2 border rounded flex-1"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="p-2 border rounded flex-1"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Crear
        </button>
      </form>

      <ul className="space-y-3">
        {tasks.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center bg-white p-4 rounded shadow"
          >
            <div>
              <h2
                className={`font-semibold ${
                  t.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {t.title}
              </h2>
              <p className="text-sm text-gray-500">{t.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleTask(t)}
                className="px-3 py-1 border rounded"
              >
                {t.completed ? "Desmarcar" : "Hecho"}
              </button>
              <button
                onClick={() => deleteTask(t.id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
