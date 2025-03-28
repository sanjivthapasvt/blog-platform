import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(""); 
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
    setError(""); 

    if (!isLogin && formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const url = isLogin
        ? "http://127.0.0.1:8000/api/auth/login/"
        : "http://127.0.0.1:8000/api/auth/register/";

      const data = isLogin
        ? { username: formData.username, password: formData.password }
        : formData;

      const response = await axios.post(url, data);
      console.log("Full Response:", response.data);

      if (isLogin) {
        // Extract access token
        const accessToken = response.data.tokens?.access;
        
        if (accessToken) {
          localStorage.setItem("token", accessToken);
          console.log("Token stored:", localStorage.getItem("token"));
          navigate("/home");
        } else {
          setError("No access token found in the response");
          console.error("No access token found in response:", response.data);
        }
      }
    } catch (error) {
      console.error("Detailed Error:", error);
      console.error("Error Response:", error.response?.data || error.message);

      if (error.response?.data) {
        const errorData = error.response.data;

        if (typeof errorData === "string") {
          setError(errorData);
        } else if (typeof errorData === "object") {
          const errorMessages = Object.values(errorData)
            .flat()
            .join(" ");
          setError(errorMessages);
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>

        {/* Display Error Message */}
        {error && <p className="text-red-500 bg-red-100 p-2 rounded mb-4">{error}</p>}

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