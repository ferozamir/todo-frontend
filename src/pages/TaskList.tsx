import { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
  createdBy: string;
  completedBy?: string;
}

function TaskList({ user }: { user: any }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get("/tasks");
        setTasks(res.data);
      } catch {
        toast.error("Failed to fetch tasks");
      }
    };
    fetchTasks();
  }, []);

  const handleComplete = async (taskId: string) => {
    try {
      await API.patch(`/tasks/${taskId}`, { completed: true, completedBy: user.email });
      setTasks(tasks.map((task) => (task._id === taskId ? { ...task, completed: true, completedBy: user.email } : task)));
      toast.success("Task completed!");
    } catch {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success("Task deleted!");
    } catch {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="p-6 h-screen text-white">
      <h1 className="text-2xl font-bold mb-4 text-white">Your Tasks</h1>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="p-4 border rounded flex justify-between items-center">
              <div>
                <p className={task.completed ? "line-through text-gray-500" : ""}>{task.title}</p>
                {task.completed && <p className="text-sm text-gray-500">Completed by: {task.completedBy}</p>}
              </div>
              <div className="flex gap-2">
                {!task.completed && (
                  <button onClick={() => handleComplete(task._id)} className="bg-green-500 text-white px-3 py-1 rounded">
                    Complete
                  </button>
                )}
                <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
