import { Link } from "react-router-dom";

function Dashboard({ user }: { user: any }) {
    return (
        <div className="p-6 flex flex-col items-center h-screen">
            <h1 className="text-3xl font-bold mb-4 text-white">Welcome, {user.email} 👋</h1>
            <div className="flex gap-4">
                <Link to="/tasks" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    View Tasks
                </Link>
                <Link to="/add-task" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                    Add Task
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;
