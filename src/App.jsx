import React, { useState, useEffect } from "react";
import "./App.scss";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
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
        <button onClick={() => setFilter("Completed")}>Completed</button>
        <button onClick={() => setFilter("Pending")}>Pending</button>
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
