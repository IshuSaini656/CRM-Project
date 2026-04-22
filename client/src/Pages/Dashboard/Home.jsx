import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// 🔥 Lazy imports
const Alumni = lazy(() => import("./Alumni"));
const Resume = lazy(() => import("./Resume"));
const Placements = lazy(() => import("./Placements"));
const Dashboard = lazy(() => import("./Dashboard"));
const Student = lazy(() => import("./Student"));
const CreateUser = lazy(() => import("./CreateUser"));
const Courses = lazy(() => import("./Courses"));
const Profile = lazy(() => import("./Profile"));

function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="student" element={<Student />} />
        <Route path="courses" element={<Courses />} />
        <Route path="placements" element={<Placements />} />
        <Route path="resume" element={<Resume />} />
        <Route path="alumni" element={<Alumni />} />
        <Route path="createuser" element={<CreateUser />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}

export default Home;
