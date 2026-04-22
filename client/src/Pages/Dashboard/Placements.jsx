import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Placement = () => {
  const totalPlacements = 320;
  const last90Days = 48;

  const placementData = [
    { name: "MERN", value: 140 },
    { name: "Data Sci", value: 80 },
    { name: "ML", value: 60 },
    { name: "App Dev", value: 40 },
  ];

  const colors = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444"];

  const latestPlacements = [
    {
      student: "Rahul Sharma",
      course: "MERN Stack",
      salary: "8 LPA",
      company: "Infosys",
    },
    {
      student: "Aman Verma",
      course: "Data Science",
      salary: "10 LPA",
      company: "TCS",
    },
    {
      student: "Priya Singh",
      course: "Machine Learning",
      salary: "12 LPA",
      company: "Amazon",
    },
    {
      student: "Rohit Kumar",
      course: "App Development",
      salary: "7 LPA",
      company: "Wipro",
    },
    {
      student: "Neha Gupta",
      course: "MERN Stack",
      salary: "9 LPA",
      company: "Accenture",
    },
  ];

  const topPackages = [
    {
      name: "Priya Singh",
      course: "Machine Learning",
      company: "Amazon",
      package: "18 LPA",
      post: "ML Engineer",
      year: "2025",
    },
    {
      name: "Rahul Sharma",
      course: "MERN Stack",
      company: "Google",
      package: "16 LPA",
      post: "Full Stack Developer",
      year: "2025",
    },
    {
      name: "Aman Verma",
      course: "Data Science",
      company: "Microsoft",
      package: "15 LPA",
      post: "Data Scientist",
      year: "2024",
    },
    {
      name: "Neha Gupta",
      course: "MERN Stack",
      company: "Accenture",
      package: "14 LPA",
      post: "Software Engineer",
      year: "2024",
    },
  ];

  return (
    <div className="p-3 sm:p-6 bg-slate-950 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-6">
        Placement Overview
      </h1>

      {/* TOP */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6">
          <p className="text-slate-400 text-xs sm:text-sm">Total Placements</p>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mt-2">
            {totalPlacements}
          </h2>
          <p className="text-emerald-400 text-xs sm:text-sm mt-2">
            Overall placements till now
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6">
          <p className="text-slate-400 text-xs sm:text-sm">
            Last 90 Days Placements
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mt-2">
            {last90Days}
          </h2>
          <p className="text-emerald-400 text-xs sm:text-sm mt-2">
            Recent placement growth
          </p>
        </div>
      </div>

      {/* GRAPH + CARDS */}
      <div className="grid lg:grid-cols-2 gap-6 mb-10">
        {/* PIE FIXED */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6">
          <h2 className="text-white text-base sm:text-lg font-semibold mb-4">
            Course Wise Placements
          </h2>

          <div className="w-full h-[260px] sm:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={placementData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                >
                  {placementData.map((entry, index) => (
                    <Cell key={index} fill={colors[index % colors.length]} />
                  ))}
                </Pie>

                <Tooltip />

                {/* 🔥 Legend instead of labels */}
                <Legend wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOP PACKAGES */}
        <div>
          <h2 className="text-white text-base sm:text-lg font-semibold mb-4">
            Top Highest Packages
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topPackages.map((student, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:bg-slate-800 transition"
              >
                <h3 className="text-white font-semibold">{student.name}</h3>

                <p className="text-slate-400 text-sm mb-2">{student.post}</p>

                <div className="text-sm space-y-1">
                  <p className="text-slate-300">Course: {student.course}</p>
                  <p className="text-slate-300">Company: {student.company}</p>
                  <p className="text-slate-300">Year: {student.year}</p>
                </div>

                <div className="mt-3 text-emerald-400 font-bold">
                  {student.package}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABLE (UNCHANGED) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-white text-lg font-semibold mb-6">
          Latest Placements
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-700">
                <th className="text-left py-3">Student</th>
                <th className="text-left">Course</th>
                <th className="text-left">Company</th>
                <th className="text-left">Salary</th>
              </tr>
            </thead>

            <tbody>
              {latestPlacements.map((p, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-800 hover:bg-slate-800"
                >
                  <td className="py-3 text-white">{p.student}</td>
                  <td className="text-slate-300">{p.course}</td>
                  <td className="text-slate-300">{p.company}</td>
                  <td className="text-emerald-400">{p.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Placement;
