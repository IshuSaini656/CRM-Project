import React from "react";
import { FileText } from "lucide-react";

const Resume = () => {
  const resumes = [
    {
      name: "Rahul Sharma",
      course: "MERN Stack",
      skills: ["React", "Node", "MongoDB"],
      experience: "Fresher",
      resume: "#",
    },

    {
      name: "Priya Singh",
      course: "Machine Learning",
      skills: ["Python", "TensorFlow", "Pandas"],
      experience: "Fresher",
      resume: "#",
    },

    {
      name: "Aman Verma",
      course: "Data Science",
      skills: ["Python", "SQL", "PowerBI"],
      experience: "Internship",
      resume: "#",
    },

    {
      name: "Neha Gupta",
      course: "App Development",
      skills: ["Flutter", "Firebase", "Dart"],
      experience: "Fresher",
      resume: "#",
    },

    {
      name: "Rohit Kumar",
      course: "Cyber Security",
      skills: ["Ethical Hacking", "Linux", "Networking"],
      experience: "Internship",
      resume: "#",
    },

    {
      name: "Anjali Mehta",
      course: "MERN Stack",
      skills: ["NextJS", "Express", "MongoDB"],
      experience: "Fresher",
      resume: "#",
    },
  ];

  return (
    <div className="p-6 bg-slate-950 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">Student Resumes</h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {resumes.map((student, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:bg-slate-800 transition"
          >
            {/* ICON */}

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <FileText className="text-white" size={20} />
              </div>

              <h2 className="text-lg font-semibold text-white">
                {student.name}
              </h2>
            </div>

            {/* COURSE */}

            <p className="text-slate-400 text-sm mb-3">
              Course : <span className="text-white">{student.course}</span>
            </p>

            {/* SKILLS */}

            <div className="flex flex-wrap gap-2 mb-4">
              {student.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* EXPERIENCE */}

            <p className="text-slate-400 text-sm mb-4">
              Experience :{" "}
              <span className="text-white">{student.experience}</span>
            </p>

            {/* BUTTON */}

            <a
              href={student.resume}
              className="block text-center bg-indigo-600 hover:bg-indigo-500 transition text-white py-2 rounded-lg text-sm"
            >
              View Resume
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resume;
