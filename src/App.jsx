import React, { useState, useEffect } from "react";
import "./App.scss";

function App() {
  const [newTasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("newTasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }, [newTasks]);

  const addTask = () => {
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    setTasks([...newTasks, newTask]);
    setTitle("");
    setDescription("");
  };

  const toggleTask = (id) => {
    setTasks(
      newTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = newTasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h2>📝 Task Manager</h2>

      {/* Add Task Form */}
      <div className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask}>+ Add Task</button>
      </div>

      {/* Filter Buttons */}
      <div className="filters">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Pending")}>Pending...</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => toggleTask(task.id)}>
              {task.completed ? "⏰ Mark Pending" : "👍 Mark Completed"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
