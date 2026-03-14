import React, { useContext } from "react";
import Layout from "../Components/Layout";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../ContextApi/UserContext";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";

export default function Register() {
  const { register } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formValidation = () => {
    const { email, username, password, confirmPassword } = formData;
    if (!email || !username || !password || !confirmPassword) {
      setError("Please fill all fields");
      return false;
    }
    if (password !== confirmPassword) {
      setError("INCORRECT PASSWORD");
      return;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValidation()) return;
    try {
      setLoading(true);
      await register(formData);
      toast.success("Registration Succesful");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <Loader loading={loading} />
      <form
        action=""
        className="flex flex-col justify-center items-center gap-12 container mx-auto"
        onSubmit={handleSubmit}
      >
        <Link to="/">
          <div className="w-80 md:w-160 lg:w-240 xl:w-275 text-left">
            <p className="font-semibold text-4xl flex">
              <MdArrowBackIos size={45} /> Register
            </p>
          </div>
        </Link>

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

        <div className="relative w-80 md:w-160 lg:w-240 xl:w-275">
          <span className="absolute -top-4 left-4 bg-white px-2 text-xl text-gray-600">
            Username
          </span>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleOnChange}
            className="border border-gray-400 w-full h-14 rounded-sm px-8"
            placeholder="E.g. Idinma1234"
          />
        </div>

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
            placeholder="Not less than 8 characters"
          />
        </div>

        <div className="relative w-80 md:w-160 lg:w-240 xl:w-275">
          <span className="absolute -top-4 left-4 bg-white px-2 text-xl text-gray-600">
            Confirm Password
          </span>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleOnChange}
            className="border border-gray-400 w-full h-14 rounded-sm px-8"
            placeholder="Make sure it matches the password you entered above"
          />
        </div>

        {error && <p className="text-red-500 font-semibold">{error}</p>}

        <button
          type="submit"
          className="w-80 md:w-160 lg:w-240 xl:w-275 bg-purple-600 rounded-md py-4 px-4 text-white cursor-pointer"
        >
          Done
        </button>
      </form>
    </Layout>
  );
}
