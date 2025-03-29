import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const url = isLogin
        ? `${baseUrl}/auth/login/`
        : `${baseUrl}/auth/register/`;

      const data = isLogin
        ? { username: formData.username, password: formData.password }
        : formData;

      const response = await axios.post(url, data);
      console.log("Full Response:", response.data);

      if (isLogin) {
        const accessToken = response.data.tokens?.access;
        const refreshToken = response.data.tokens?.refresh;
        
        if (accessToken && refreshToken) {
          localStorage.setItem("token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);
          // Store user data
          localStorage.setItem("user", JSON.stringify({
            username: formData.username
          }));
          console.log("Tokens and user data stored:", {
            access: localStorage.getItem("token"),
            refresh: localStorage.getItem("refresh_token"),
            user: localStorage.getItem("user")
          });
          // Navigate with state
          navigate("/home", { state: { showLoginSuccess: true } });
        } else {
          toast.error("No tokens found in the response");
          console.error("No tokens found in response:", response.data);
        }
      } else {
        toast.success("Registration successful! Please login.");
        setIsLogin(true);
        setFormData({
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        });
      }
    } catch (error) {
      console.error("Detailed Error:", error);
      console.error("Error Response:", error.response?.data || error.message);

      if (error.response?.data) {
        const errorData = error.response.data;

        if (typeof errorData === "string") {
          toast.error(errorData);
        } else if (typeof errorData === "object") {
          const errorMessages = Object.values(errorData)
            .flat()
            .join(" ");
          toast.error(errorMessages);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen p-6 w-full">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={3}
      />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white text-left">
          {isLogin ? "Welcome Back" : "Join Us"}
        </h1>

        {/* Auth Card */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-lg p-8 backdrop-blur-sm bg-opacity-50 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-8 text-center">
              {isLogin ? "Login to Your Account" : "Create New Account"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </>
              )}
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
              />
              {!isLogin && (
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                />
              )}
              <button
                type="submit"
                className="w-full cursor-pointer bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transform hover:-translate-y-0.5 transition-all duration-150"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-400 hover:text-blue-300 cursor-pointer font-semibold transition-colors"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;