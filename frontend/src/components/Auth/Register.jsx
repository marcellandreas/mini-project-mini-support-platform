import React,{ useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../store/slices/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("fan");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerLoading, error, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, role }));
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">
          Create Account
        </h2>
       {error && (
  <p className="text-red-500 text-sm mb-4 text-center">
    {typeof error === "string" ? error : error.message || JSON.stringify(error)}
  </p>
)}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
            <input
            id="name"
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block mb-1 font-medium text-gray-700">Role</label>
            <select
            id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            >
              <option value="fan">Fan</option>
              <option value="creator">Creator</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={registerLoading}
          >
            {registerLoading ? "Loading..." : "Register"}
          </button>
        </form>
        <p>sudah punya akun? <Link to="/login" className="text-blue-500">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
