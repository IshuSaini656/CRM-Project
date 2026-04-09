import React from "react";
import { GraduationCap } from "lucide-react";

const Alumni = () => {
  const alumniData = [
    {
      name: "Rahul Sharma",
      course: "MERN Stack",
      company: "Google",
      role: "Full Stack Developer",
      package: "16 LPA",
      year: "2025",
    },

    {
      name: "Priya Singh",
      course: "Machine Learning",
      company: "Amazon",
      role: "ML Engineer",
      package: "18 LPA",
      year: "2025",
    },

    {
      name: "Aman Verma",
      course: "Data Science",
      company: "Microsoft",
      role: "Data Scientist",
      package: "15 LPA",
      year: "2024",
    },

    {
      name: "Neha Gupta",
      course: "App Development",
      company: "Accenture",
      role: "Software Engineer",
      package: "12 LPA",
      year: "2024",
    },

    {
      name: "Rohit Kumar",
      course: "Cyber Security",
      company: "Infosys",
      role: "Security Analyst",
      package: "11 LPA",
      year: "2024",
    },

    {
      name: "Anjali Mehta",
      course: "MERN Stack",
      company: "TCS",
      role: "Backend Developer",
      package: "10 LPA",
      year: "2023",
    },
  ];

  return (
    <div className="p-6 bg-slate-950 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">Alumni Network</h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {alumniData.map((alumni, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:bg-slate-800 transition"
          >
            {/* HEADER */}

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <GraduationCap className="text-white" size={20} />
              </div>

              <h2 className="text-lg font-semibold text-white">
                {alumni.name}
              </h2>
            </div>

            {/* DETAILS */}

            <div className="space-y-1 text-sm">
              <p className="text-slate-300">
                Course : <span className="text-white">{alumni.course}</span>
              </p>

              <p className="text-slate-300">
                Company : <span className="text-white">{alumni.company}</span>
              </p>

              <p className="text-slate-300">
                Role : <span className="text-white">{alumni.role}</span>
              </p>

              <p className="text-slate-300">
                Year : <span className="text-white">{alumni.year}</span>
              </p>
            </div>

            {/* PACKAGE */}

            <div className="mt-4 text-emerald-400 font-semibold text-lg">
              {alumni.package}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alumni;
