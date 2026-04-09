import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import api from "../../utils/apicall";
import toast from "react-hot-toast"

const Student = () => {
  const [form, setForm] = useState({
    name: "",
    course: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!form.name || !form.course || !form.phone || !form.email) {
      alert("Please fill all fields");
      return;
    }

  try{
    const newStudent = await api.post("./hr/create-student" , form)
    toast.success(newStudent.data.message)
    setForm({
      name: "",
      course: "",
      phone: "",
      email: "",
    });
  }catch(error){
    toast.error(error.response?.data?.message || "something went wrong")
  }
  };

  return (
    <div className="min-h-[75vh] bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-10">
        {/* HEADER */}

        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-600 rounded-lg">
            <UserPlus className="text-white" size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Add New Student</h2>

            <p className="text-slate-400 text-sm">
              Enter student details to register
            </p>
          </div>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {/* NAME */}

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-400">Student Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter student name"
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* COURSE */}

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-400">Course</label>

            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select Course</option>

              <option value="MERN Stack">MERN Stack</option>

              <option value="Machine Learning">Machine Learning</option>

              <option value="Data Science">Data Science</option>

              <option value="App Development">App Development</option>

              <option value="Cyber Security">Cyber Security</option>
            </select>
          </div>

          {/* PHONE */}

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-400">Phone Number</label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* EMAIL */}

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-400">Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="md:col-span-2 bg-indigo-600 hover:bg-indigo-500 transition py-3 rounded-lg font-semibold text-white"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default Student;
