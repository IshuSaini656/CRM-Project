import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Placement = () => {
  const totalPlacements = 320;
  const last90Days = 48;

  const placementData = [
    { name: "MERN Stack", value: 140 },
    { name: "Data Science", value: 80 },
    { name: "Machine Learning", value: 60 },
    { name: "App Development", value: 40 },
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
    <div className="p-6 bg-slate-950 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">Placement Overview</h1>

      {/* TOP STATS */}

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <p className="text-slate-400 text-sm">Total Placements</p>

          <h2 className="text-4xl font-bold text-white mt-2">
            {totalPlacements}
          </h2>

          <p className="text-emerald-400 text-sm mt-2">
            Overall placements till now
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <p className="text-slate-400 text-sm">Last 90 Days Placements</p>

          <h2 className="text-4xl font-bold text-white mt-2">{last90Days}</h2>

          <p className="text-emerald-400 text-sm mt-2">
            Recent placement growth
          </p>
        </div>
      </div>

      {/* GRAPH + HIGHEST PACKAGE */}

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* COURSE WISE GRAPH */}

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-white text-lg font-semibold mb-6">
            Course Wise Placements
          </h2>

          <div className="h-[80%]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={placementData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label={({ name }) => name}
                >
                  {placementData.map((entry, index) => (
                    <Cell key={index} fill={colors[index % colors.length]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOP PACKAGE CARDS */}

        <div>
          <h2 className="text-white text-lg font-semibold mb-6">
            Top Highest Packages
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {topPackages.map((student, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:bg-slate-800 transition"
              >
                <h3 className="text-lg font-semibold text-white">
                  {student.name}
                </h3>

                <p className="text-slate-400 text-sm mb-3">{student.post}</p>

                <div className="space-y-1 text-sm">
                  <p className="text-slate-300">
                    Course :{" "}
                    <span className="text-white">{student.course}</span>
                  </p>

                  <p className="text-slate-300">
                    Company :{" "}
                    <span className="text-white">{student.company}</span>
                  </p>

                  <p className="text-slate-300">
                    Year : <span className="text-white">{student.year}</span>
                  </p>
                </div>

                <div className="mt-4 text-emerald-400 font-bold text-lg">
                  {student.package}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LATEST PLACEMENTS */}

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
