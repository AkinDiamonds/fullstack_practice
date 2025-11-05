import { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

//  add and update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill out all fields");
      return;
    }

    if (editId !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === editId ? { ...task, title, description } : task
        )
      );
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        title,
        description,
      };
      setTasks([...tasks, newTask]);
    }

    setTitle("");
    setDescription("");
  };

  // edittask
  const handleEdit = (task) => {
    setEditId(task.id);
    setTitle(task.title);
    setDescription(task.description);
  };

  // delete task
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // stats
  const totalTasks = tasks.length;

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{editId ? "Update" : "Add Task"}</button>
      </form>

      <div className="stats">
        <p>Total Tasks: {totalTasks}</p>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty">No tasks yet. Add one.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-item">
              <div className="task-info">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
              <div className="actions">
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
