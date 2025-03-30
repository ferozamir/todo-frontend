import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api";

function AddTask({ user }: { user: any }) {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return toast.error("Task title cannot be empty");

        try {
            await API.post("/tasks/create", { title, createdBy: user.email });
            toast.success("Task added successfully!");
            navigate("/tasks");
        } catch {
            toast.error("Failed to add task");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen text-center">
            <form onSubmit={handleAddTask} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-4">Add Task</h2>
                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="px-4 py-2 mb-4 w-full bg-gray-200 rounded-lg"
                    required
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-3/6">
                    Add Task
                </button>
            </form>
        </div>
    );
}

export default AddTask;
