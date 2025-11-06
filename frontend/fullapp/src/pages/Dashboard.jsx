import { useState, useEffect } from "react";
import "./Dashboard.css"

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  // fetch tasks
  async function getTasks() {
    const res = await fetch("http://127.0.0.1:8000/tasks/");
    const data = await res.json();
    setTasks(data);
  }

  useEffect(() => {
    getTasks();
  }, []);

  // create or update task
  async function handleSubmit(e) {
    e.preventDefault();

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://127.0.0.1:8000/tasks/${editId}`
      : "http://127.0.0.1:8000/tasks/";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    setTitle("");
    setDescription("");
    setEditId(null);
    getTasks();
  }

  // delete task
  async function deleteTask(id) {
    await fetch(`http://127.0.0.1:8000/tasks/${id}`, { method: "DELETE" });
    getTasks();
  }

  // edit task
  function startEdit(task) {
    setEditId(task.id);
    setTitle(task.title);
    setDescription(task.description);
  }

  return (
    <div >
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <ul>
        {tasks.map((t) => (
          <li
            key={t.id}
          >
            <div>
              <strong>{t.title}</strong>
              <p>{t.description}</p>
            </div>
            <div>
              <button onClick={() => startEdit(t)}>Edit</button>
              <button onClick={() => deleteTask(t.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
