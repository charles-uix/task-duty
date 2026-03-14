import React, { useContext, useState } from "react";
import Layout from "../Components/Layout";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../ContextApi/UserContext";
import { toast } from "react-toastify";
import FullPageLoader from "../Components/PageLoader";

export default function Login() {
  const { login } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formValidation = () => {
    const { email, password } = formData;
    if (!email || !password) {
      setError("Please fill all fields");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValidation()) return;
    try {
      setLoading(true);

      await login(formData);
      toast.success("Login Succesful");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <Layout>
      {error && <p>{error}</p>}
      <form
        className="flex flex-col justify-center items-center gap-12 container mx-auto"
        onSubmit={handleSubmit}
      >
        <Link to="/">
          <div className="w-80 md:w-160 lg:w-240 xl:w-275 text-left">
            <p className="font-semibold text-4xl flex">
              <MdArrowBackIos size={45} /> Login
            </p>
          </div>
        </Link>

        {/* Email */}
        <div className="relative w-80 md:w-160 lg:w-240 xl:w-275">
          <span className="absolute -top-4 left-4 bg-white px-2 text-xl text-gray-600">
            Email
          </span>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleOnChange}
            className="border border-gray-400 w-full h-14 rounded-sm px-8"
            placeholder="E.g. amadiidinma@gmail.com"
          />
        </div>

        {/* Password */}
        <div className="relative w-80 md:w-160 lg:w-240 xl:w-275">
          <span className="absolute -top-4 left-4 bg-white px-2 text-xl text-gray-600">
            Password
          </span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleOnChange}
            className="border border-gray-400 w-full h-14 rounded-sm px-8"
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="text-red-500 font-semibold">{error}</p>}

        <button
          type="submit"
          className="w-80 md:w-160 lg:w-240 xl:w-275 bg-purple-600 rounded-md py-4 px-4 text-white cursor-pointer"
        >
          Login
        </button>
      </form>
    </Layout>
  );
}
