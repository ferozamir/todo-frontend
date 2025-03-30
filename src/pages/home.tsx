import { useState, useEffect } from "react";
import axios from "axios";

const BASE_API_URL = "http://localhost:3000/todos";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch tasks
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(BASE_API_URL);
        setTodos(res.data);
      } catch (error) {
        console.error("Error fetching todos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // Add task
  const addTodo = async () => {
    if (!title) return;
    try {
      const res = await axios.post(BASE_API_URL, { title });
      setTodos([...todos, res.data]);
      setTitle("");
    } catch (error) {
      console.error("Error adding todo", error);
    }
  };

  // Toggle task completion
  const toggleTodo = async (todo: Todo) => {
    try {
      await axios.put(`${BASE_API_URL}/${todo._id}`, { completed: !todo.completed });
      setTodos(todos.map(t => t._id === todo._id ? { ...t, completed: !t.completed } : t));
    } catch (error) {
      console.error("Error toggling todo", error);
    }
  };

  // Delete task
  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${BASE_API_URL}/${id}`);
      setTodos(todos.filter(t => t._id !== id));
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l"
          placeholder="New task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 cursor-pointer"
        >
          Add
        </button>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id} className="flex items-center justify-between p-2 border-b">
              <span
                className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
                onClick={() => toggleTodo(todo)}
              >
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
