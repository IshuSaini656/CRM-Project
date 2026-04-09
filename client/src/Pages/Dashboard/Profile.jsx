import React, { useContext } from "react";
import { Camera } from "lucide-react";
import { AuthContext } from "../../utils/Authcontext.jsx";
import api from "../../utils/apicall.js";
import toast from "react-hot-toast"

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    

    try {
      const res = await api.patch("/admin/profile-image", formData);
      toast.success(res.data.message);

     setUser((prev) => ({
       ...prev,
       imageUrl: res.data.imageUrl,
     }));
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen p-6 flex justify-center items-center">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-xl p-8">
        {/* PROFILE IMAGE */}

        <div className="flex flex-col items-center relative">
          <div className="relative">
            <img
              src={user.imageUrl}
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-indigo-600 object-cover"
            />

            {/* IMAGE EDIT BUTTON */}

            <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-500">
              <Camera size={16} className="text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <h2 className="text-xl font-semibold text-white mt-4">{user.name}</h2>
          <p className="text-slate-400 text-sm">{user.role}</p>
        </div>

        {/* DETAILS */}

        <div className="mt-8 space-y-4">
          <div className="bg-slate-800 p-3 rounded-lg">
            <p className="text-xs text-slate-400 mb-1">Name</p>
            <p className="text-white">{user.name}</p>
          </div>

          <div className="bg-slate-800 p-3 rounded-lg">
            <p className="text-xs text-slate-400 mb-1">Email</p>
            <p className="text-white">{user.email}</p>
          </div>

          <div className="bg-slate-800 p-3 rounded-lg">
            <p className="text-xs text-slate-400 mb-1">Phone</p>
            <p className="text-white">{user.phone}</p>
          </div>

          <div className="bg-slate-800 p-3 rounded-lg">
            <p className="text-xs text-slate-400 mb-1">Role</p>
            <p className="text-white">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
