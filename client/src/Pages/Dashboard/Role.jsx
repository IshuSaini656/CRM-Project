import React, { useState ,useEffect } from "react";
import Home from "./Home";
import isEduTrack from "../../assets/IsEduTrack.png";
import menuItems from "../../config/menuconfig";
import { IoSearch } from "react-icons/io5";
import Profile from "../../assets/profile.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import Modals from "../../utils/Modals";
import api from "../../utils/apicall";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../utils/Authcontext.jsx"

export default function Role() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user , setUser } = useContext(AuthContext);
      
  const handleLogout = async () => {
    try {
      const res = await api.post("/logout");
      localStorage.removeItem("accessToken");
      toast.success(res.data.message);
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.response?.data.message)
    }
  };

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("accessToken");

      const res = await api.get("/admin/userdata", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data.data
      setUser((prev) => ({
        ...prev,
        role: data.role,
        name: data.name,
        email: data.email,
        phone: data.phone,
        imageUrl: data.profile,
      }));
    }

    fetchUser();
  }, [setUser]);

  const role = user.role;
  const userName = user.name;

  return (
    <div className="bg-[#050915] min-h-screen text-white flex">
      {/* Sidebar */}
      <div
        className={`fixed md:static z-50 bg-[#050915] border-r border-slate-800 
        h-full w-[70%] sm:w-[50%] md:w-[18vw] 
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300`}
      >
        <div className="py-3 px-3">
          <img src={isEduTrack} alt="IS EduTrack" />
        </div>

        {/* Menu */}
        <div className="flex flex-col w-full">
          {menuItems
            .filter((item) => item.roles.includes(role))
            .map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-4 pl-10 transition 
                     ${isActive ? "bg-slate-800" : "hover:bg-slate-800"}`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
        </div>

        <div
          className="bg-red-700 w-full py-2 mt-5 text-center cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          Logout
        </div>

        <Modals
          isOpen={modalOpen}
          message="Are you sure you want to logout?"
          onConfirm={handleLogout}
          onClose={() => setModalOpen(false)}
        />
      </div>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 md:w-[82vw]">
        {/* Navbar */}
        <div className="border-b border-slate-800 min-h-[12vh] px-4 flex flex-wrap items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-xl"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          {/* Search */}
          <span className="flex items-center gap-2 border border-white rounded-2xl py-1 px-3 w-full sm:w-[40%] md:w-[25%]">
            <IoSearch />
            <input
              type="search"
              name="search"
              className="border-none outline-none bg-transparent w-full"
              placeholder="Search"
            />
          </span>

          {/* User */}
          <span className="flex items-center gap-5">
            <span className="flex flex-col items-end">
              <p className="text-yellow-400 text-sm md:text-base">{userName}</p>
              <p className="font-light text-zinc-400 text-xs md:text-sm">
                {role}
              </p>
            </span>

            <span
              className="w-10 h-10 md:w-11 md:h-11 border border-white rounded-full bg-zinc-200 flex items-center justify-center overflow-hidden text-zinc-900 text-xl"
              onClick={() => {
                navigate("/role/profile");
              }}
            >
              <img
                src={user.imageUrl}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </span>
          </span>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6 h-[calc(100vh-12vh)] overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <Home />
        </div>
      </div>
    </div>
  );
}