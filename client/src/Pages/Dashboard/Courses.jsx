import React from "react";
import { BookOpen } from "lucide-react";

const Courses = () => {
  const courses = [
    {
      name: "MERN Stack",
      fees: "₹65,000",
      duration: "6 Months",
      total: 320,
      learning: 180,
      placed: 140,
    },

    {
      name: "Machine Learning",
      fees: "₹80,000",
      duration: "8 Months",
      total: 210,
      learning: 120,
      placed: 90,
    },

    {
      name: "Data Science",
      fees: "₹75,000",
      duration: "7 Months",
      total: 250,
      learning: 150,
      placed: 100,
    },

    {
      name: "App Development",
      fees: "₹60,000",
      duration: "6 Months",
      total: 190,
      learning: 110,
      placed: 80,
    },

    {
      name: "Cyber Security",
      fees: "₹70,000",
      duration: "7 Months",
      total: 140,
      learning: 90,
      placed: 50,
    },
  ];

  return (
    <div className="p-6 bg-slate-950 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">Courses Overview</h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:bg-slate-800 transition"
          >
            {/* HEADER */}

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <BookOpen className="text-white" />
              </div>

              <h2 className="text-lg font-semibold text-white">
                {course.name}
              </h2>
            </div>

            {/* COURSE INFO */}

            <div className="space-y-2 text-sm">
              <p className="text-slate-300">
                Duration : <span className="text-white">{course.duration}</span>
              </p>

              <p className="text-slate-300">
                Fees : <span className="text-white">{course.fees}</span>
              </p>

              <p className="text-slate-300">
                Total Students :{" "}
                <span className="text-white">{course.total}</span>
              </p>
            </div>

            {/* STATS */}

            <div className="mt-4 flex justify-between">
              <div className="text-center">
                <p className="text-yellow-400 text-lg font-semibold">
                  {course.learning}
                </p>

                <p className="text-xs text-slate-400">Learning</p>
              </div>

              <div className="text-center">
                <p className="text-emerald-400 text-lg font-semibold">
                  {course.placed}
                </p>

                <p className="text-xs text-slate-400">Placed</p>
              </div>
            </div>

            {/* PROGRESS BAR */}

            <div className="mt-4">
              <div className="w-full bg-slate-700 h-2 rounded">
                <div
                  className="bg-emerald-500 h-2 rounded"
                  style={{ width: `${(course.placed / course.total) * 100}%` }}
                ></div>
              </div>

              <p className="text-xs text-slate-400 mt-1">Placement Rate</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
