import React from 'react'
import Alumni from './Alumni'
import Resume from './Resume'
import Placements from './Placements'
import Dashboard from './Dashboard'
import Student from './Student'
import CreateUser from "./CreateUser"
import Courses from './Courses'
import Profile from './Profile'
import { Routes, Route } from "react-router-dom";
function Home() {
  return (
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
  );
}

export default Home