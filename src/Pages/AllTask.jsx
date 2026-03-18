import React, { useContext, useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { Link } from "react-router-dom";
import TaskCard from "../Components/TaskCard";
import { TaskContext } from "../ContextApi/TaskContext.jsx";
import Loader from "../Components/Loader.jsx";

export default function AllTask() {
  const { allTask, getTasks } = useContext(TaskContext);

  const [loading, setLoading] = useState(true); // start as true
  const [query, setQuery] = useState(""); // search query state

  useEffect(() => { 
    const fetchTasks = async () => {
      setLoading(true);
      await getTasks();
      setLoading(false); // stop loader regardless of task count
    };

    fetchTasks();
  }, []);

  // Filter tasks based on search query
  const filteredTasks = allTask.filter(
    (task) =>
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      task.description.toLowerCase().includes(query.toLowerCase()) ||
      task.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Layout>
      <Loader loading={loading} />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 py-4 px-6 md:px-58 mb-8">
        <p className="text-2xl md:text-4xl font-semibold">My Task</p>
        <Link to="/new">
          <button className="text-purple-400 bg-white font-semibold text-lg md:text-xl cursor-pointer">
            + Add New Task
          </button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-6 px-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-500 rounded-lg  focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition text-md md:text-2xl font-semibold"
        />
      </div>

      {/* Render all tasks */}
      <div className="flex flex-col gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id} // assuming MongoDB, otherwise use task.id
              _id={task._id}
              title={task.title}
              description={task.description}
              tag={task.tag}
            />
          ))
        ) : (
          <p className="text-purple-600 text-center">
            {query ? "No tasks match your search." : "No tasks yet. Add one above!"}
          </p>
        )}
      </div>
    </Layout>
  );
}