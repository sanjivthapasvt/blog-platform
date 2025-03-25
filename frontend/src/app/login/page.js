"use client"; // Required for client-side hooks

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() { 
    const router = useRouter();
    
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        setLoading(true);

        try {
            const res = await fetch("http://127.0.0.1:8000/api/auth/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Login failed!");
            }

            router.push("/dashboard"); // Redirect to dashboard after success
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded" />
                
                <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-2 rounded">
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
