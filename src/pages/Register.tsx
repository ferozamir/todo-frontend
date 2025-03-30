import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", { email, password });
            toast.success("Registration successful! Please login.");
            navigate("/");
        } catch {
            toast.error("Registration failed");
        }
    };

    return (
        <div className="flex justify-center items-center text-center h-screen">
            <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-8">Register</h2>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-4 py-2 mb-4 bg-gray-200 w-full rounded-lg" required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="px-4 py-2 mb-6 bg-gray-200 w-full rounded-lg" required />
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mb-3 rounded-lg w-3/6">Register</button>
                <p>Already have an Account? <Link to={'/'} className="text-blue-500 hover:underline font-medium">Login Now</Link></p>

            </form>
        </div>
    );
}

export default Register;
