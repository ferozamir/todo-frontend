import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api";

function Login({ setUser }: { setUser: (user: any) => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/signin", { email, password });
            console.log(res)
            localStorage.setItem("token", res.data.access_token);
            setUser(res.data.access_token);
            toast.success("Logged in successfully!");
            navigate("/dashboard");
        } catch {
            toast.error("Invalid credentials");
        }
    };

    return (
        <div className="flex justify-center items-center text-center h-screen">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl mb-8 font-semibold">Login</h2>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-4 py-2 mb-4 w-full rounded-lg bg-gray-200" required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="px-4 py-2 mb-6 w-full rounded-lg bg-gray-200" required />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-2 w-3/6">Login</button>
                <p>Don't have an Account? <Link to={'/register'} className="text-blue-500 hover:underline">Register now</Link></p>
            </form>
        </div>
    );
}

export default Login;
