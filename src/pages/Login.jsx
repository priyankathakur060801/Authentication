import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);
  

  const [page, setPage] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (page === "Sign up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
         getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {page === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {page === "Sign Up" ? "Create Your Account" : "Login to Your Account"}
        </p>
        <form onSubmit={handlesubmit}>
          {page === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                className="bg-transparent outline-none"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Full Name"
                required
              />
            </div>
          )}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              className="bg-transparent outline-none"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email Id"
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              className="bg-transparent outline-none"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Paassword"
              required
            />
          </div>
          <p
            className="mb-4 text-indigo-500 cursor-pointer"
            onClick={() => navigate("/reset-password")}
          >
            Forgot Password?
          </p>
          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 py-2.5 text-white font-medium"
          >
            {page}
          </button>
        </form>
        {page === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-400 underline cursor-pointer "
              onClick={() => setPage("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an account?{" "}
            <span
              className="text-blue-400 underline cursor-pointer "
              onClick={() => setPage("Sign Up")}
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
