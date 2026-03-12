import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Images/logo.png";
import person from "../assets/Images/person.png";
import { MdMenu, MdClose } from "react-icons/md";
import { UserContext } from "../ContextApi/UserContext";

export default function Header() {
  const {user, logout} = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-b-gray-400 py-4 px-4 md:px-16 xl:px-58 mb-28">
      <div className="flex justify-between items-center">
      
        <Link to="/" className="shrink-0">
          <div className="w-39.25 h-10.25">
            <img src={logo} alt="Logo" className="h-full w-auto" />
          </div>
        </Link>

        
        { user ? (
          <nav className="hidden lg:flex items-center gap-6">
          <Link to="/new"><p>New Task</p></Link>
          <Link to="/all"><p>All Task</p></Link>
          <img src={person} alt="Profile" />
        </nav>
        ) : (
          <nav className="hidden lg:flex items-center gap-4">
            <Link to="/login">
              <button className="bg-white border border-purple-600 text-purple-600 py-2 px-4 rounded-md text-base md:text-lg lg:text-xl hover:bg-purple-50">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-purple-600 text-white py-2 px-4 rounded-md text-base md:text-lg lg:text-xl hover:bg-purple-700">
                Register
              </button>
            </Link>
          </nav>
        ) }

       
        <button
          className="lg:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      
     {isOpen && (
  <div className="lg:hidden mt-4 flex flex-col gap-4 bg-white shadow-lg rounded-md p-4">
    {user ? (
      <>
        <Link to="/new" onClick={() => setIsOpen(false)}>New Task</Link>
        <Link to="/all" onClick={() => setIsOpen(false)}>All Task</Link>
        <img src={person} alt="Profile" className="w-8 h-8 rounded-full" />
        <button onClick={() => { logout(); setIsOpen(false); }}>Logout</button>
      </>
    ) : (
      <>
        <Link to="/login" onClick={() => setIsOpen(false)}>
          <button className="bg-white border border-purple-600 text-purple-600 py-2 px-4 rounded-md hover:bg-purple-50">
            Login
          </button>
        </Link>
        <Link to="/register" onClick={() => setIsOpen(false)}>
          <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700">
            Register
          </button>
        </Link>
      </>
    )}
  </div>
)}

    </header>
  );
}