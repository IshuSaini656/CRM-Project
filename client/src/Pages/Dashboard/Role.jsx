import React, { useState, useEffect } from "react";
import Home from "./Home";
import isEduTrack from "../../assets/isEduTrack.png";
import menuItems from "../../config/menuconfig";
import { IoSearch } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import Modals from "../../utils/Modals";
import api from "../../utils/apicall";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../utils/Authcontext.jsx";

export default function Role() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const res = await api.post("/logout");
      localStorage.removeItem("accessToken");
      toast.success(res.data.message);
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.response?.data.message);
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
      const data = res.data.data;
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
    <div className="bg-[#050915] h-screen text-white flex overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed md:static z-40 bg-[#050915] border-r border-slate-800 
       h-screen w-[80%] sm:w-[70%] md:w-[30vw] lg:w-[25vw] xl:w-[18vw] md:pt-5
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300`}
      >
        <div className="py-3 px-3">
          {/* ❗ Logo untouched */}
          <img src={isEduTrack} alt="IS EduTrack" />
        </div>

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
                    `flex items-center gap-3 p-4 pl-8 transition 
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
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 w-[82vw] flex flex-col">
        {/* Navbar (FIXED) */}
        <div className="border-b border-slate-800 min-h-[12vh] px-3 md:px-4 flex items-center justify-between gap-2 sticky top-0 bg-[#050915] z-30 ">
          {/* Left: Menu + Search */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              className="md:hidden text-xl"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>

            <div className="flex items-center gap-2 border border-white rounded-2xl py-1 px-3 w-full md:w-62">
              <IoSearch />
              <input
                type="search"
                name="search"
                className="border-none outline-none bg-transparent w-full text-sm"
                placeholder="Search"
              />
            </div>
          </div>

          {/* Right: User */}
          <div className="flex items-center gap-3 whitespace-nowrap">
            <div className="flex flex-col items-end">
              <p className="text-yellow-400 text-sm md:text-base">{userName}</p>
              <p className="font-light text-zinc-400 text-xs md:text-sm">
                {role}
              </p>
            </div>

            <div
              className="w-9 h-9 md:w-11 md:h-11 border border-white rounded-full bg-zinc-200 flex items-center justify-center overflow-hidden cursor-pointer"
              onClick={() => navigate("/role/profile")}
            >
              <img
                src={user.imageUrl}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 md:p-6 flex-1 overflow-y-auto h-[calc(100vh-12vh)]">
          <Home />
        </div>
      </div>

      {/* Modal */}
      <Modals
        isOpen={modalOpen}
        message="Are you sure you want to logout?"
        onConfirm={handleLogout}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
