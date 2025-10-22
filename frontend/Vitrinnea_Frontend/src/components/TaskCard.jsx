
import { useState } from "react";
import api from "../services/api";

export default function TaskCard({ task, onDeleted, onToggled, onUpdated }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startEdit = () => {
    setTitle(task.title || "");
    setDescription(task.description || "");
    setError(null);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setError(null);
  };

  const saveEdit = async () => {
    if (!title.trim()) {
      setError("El título no puede estar vacío");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.put(`/tasks/${task.id}`, {
        title: title.trim(),
        description: description.trim(),
      });
      setEditing(false);
      setError(null);
      onUpdated && onUpdated(data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error actualizando");
    } finally {
      setLoading(false);
    }
  };

  const toggle = async () => {
    setLoading(true);
    try {
      await api.put(`/tasks/${task.id}`, { completed: !task.completed });
      onToggled && onToggled(task.id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    if (!confirm("¿Eliminar esta tarea?")) return;
    setLoading(true);
    try {
      await api.delete(`/tasks/${task.id}`);
      onDeleted && onDeleted(task.id);
    } catch (err) {
      console.error(err);
      setError("Error eliminando");
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="card fade-in flex justify-between items-start p-4">
      <div className="animate-pulse space-y-2">
        {!editing ? (
          <>
            <h3
              className={`font-semibold text-lg ${task.completed ? "line-through text-gray-400" : ""}`}
            >
              {task.title}
            </h3>
            {task.description && <p className="text-sm text-gray-500">{task.description}</p>}
            <p className="text-xs text-gray-300 mt-1">{new Date(task.created_at).toLocaleString()}</p>
          </>
        ) : (
          <>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded mb-2"
              placeholder="Título"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded mb-2"
              rows={3}
              placeholder="Descripción (opcional)"
            />
            {error && <div className="text-sm text-red-500 mb-2">{error}</div>}
          </>
        )}
      </div>

      <div className="flex flex-col items-end ml-4 gap-2">
        {!editing ? (
          <>
            <button
              onClick={startEdit}
              className="btn text-sm px-3 py-1 border rounded hover:bg-gray-50"
              title="Editar"
            >
              Edit
            </button>
            <button
              onClick={toggle}
              className="btn text-sm px-3 py-1 border rounded"
              title={task.completed ? "Desmarcar" : "Marcar como hecho"}
            >
              {task.completed ? "Undo" : "Done"}
            </button>
            <button
              onClick={remove}
              className="text-sm px-3 py-1 bg-red-600 text-white rounded"
              title="Eliminar"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <div className="flex gap-2">
              <button
                onClick={saveEdit}
                disabled={loading}
                className="btn px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-60"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                disabled={loading}
                className="btn px-3 py-1 border rounded"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
}
