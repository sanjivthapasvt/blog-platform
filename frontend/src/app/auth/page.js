"use client"; // to run on the client side

import { useState } from "react";
import { useRouter } from "next/navigation"; // For Next.js routing
import axios from "axios";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const router = useRouter(); //navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "http://127.0.0.1:8000/api/auth/login/"
        : "http://127.0.0.1:8000/api/auth/register/";
      const data = isLogin
        ? { username: formData.username, password: formData.password }
        : formData;

      const response = await axios.post(url, data);
      console.log("Success:", response.data);

      if (isLogin) {
        localStorage.setItem("token", response.data.access);
        router.push("/dashboard"); // Redirect after login
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} className="w-full p-2 border rounded" />
              <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} className="w-full p-2 border rounded" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
            </>
          )}
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" />
          {!isLogin && (
            <input type="password" name="confirm_password" placeholder="Confirm Password" value={formData.confirm_password} onChange={handleChange} className="w-full p-2 border rounded" />
          )}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 cursor-pointer rounded hover:bg-blue-600">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"} 
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 cursor-pointer underline ml-1">
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
