import React, { useContext, useEffect } from "react";
import Layout from "../Components/Layout";
import { Link } from "react-router-dom";
import TaskCard from "../Components/TaskCard";
import { TaskContext } from "../ContextApi/TaskContext.jsx";

export default function AllTask() {
  const { allTask, getTasks } = useContext(TaskContext);

  // Fetch tasks when this component mounts
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 py-4 px-6 md:px-58 mb-8">
        <p className="text-2xl md:text-4xl font-semibold">My Task</p>
        <Link to="/new">
          <button className="text-purple-400 bg-white font-semibold text-lg md:text-xl cursor-pointer">
            + Add New Task
          </button>
        </Link>
      </div>


      {/* Render all tasks */}
      <div className="flex flex-col gap-4">
        {allTask.length > 0 ? (
          allTask.map((task) => (
            <TaskCard
              key={task._id} // assuming MongoDB, otherwise use task.id
              _id={task._id}
              title={task.title}
              description={task.description}
              tag={task.tag}
            />
          ))
        ) : (
          <p className="text-purple-600 text-center">No tasks yet. Add one above!</p>
        )}
      </div>
    </Layout>
  );
}