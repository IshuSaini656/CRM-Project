import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../Components/ui/card";

import {
  Users,
  UserCheck,
  GraduationCap,
  TrendingUp,
  Briefcase,
  BookOpen,
  Star,
  Building2
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const Dashboard =() => {

const studentData=[
{ name:"Boys",value:454,color:"#3b82f6"},
{ name:"Girls",value:402,color:"#facc15"}
]

const totalStudents=studentData.reduce((a,b)=>a+b.value,0)

const attendanceData=[
{day:"Mon",present:70,absent:30},
{day:"Tue",present:60,absent:40},
{day:"Wed",present:75,absent:25},
{day:"Thu",present:65,absent:35},
{day:"Fri",present:80,absent:20}
]

const revenueData=[
{year:"2019",revenue:20000,expenses:15000},
{year:"2020",revenue:25000,expenses:18000},
{year:"2021",revenue:30000,expenses:20000},
{year:"2022",revenue:35000,expenses:24000},
{year:"2023",revenue:42000,expenses:30000},
{year:"2024",revenue:50000,expenses:34000}
]

const companies=[
"Google","Microsoft","Amazon","Infosys","TCS","Wipro"
]

const demandedCourses=[
{name:"MERN Stack",admission:120},
{name:"Data Science",admission:95},
{name:"AI / ML",admission:80},
{name:"Cyber Security",admission:70},
{name:"Cloud Computing",admission:60},
{name:"UI UX Design",admission:50}
]

return(

<div className="flex flex-col lg:flex-row gap-4">

{/* LEFT SECTION */}

<div className="lg:w-[70%] flex flex-col gap-4">

{/* TOP CARDS */}

<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

<Card className="bg-zinc-900 border border-zinc-800">
<CardHeader className="flex justify-between">
<CardTitle className="text-sm text-zinc-400">
Total Students
</CardTitle>
<GraduationCap className="text-indigo-400"/>
</CardHeader>

<CardContent>
<div className="text-3xl font-bold text-white">
2250
</div>
<p className="text-emerald-400 text-sm flex gap-1">
<TrendingUp size={16}/> +12%
</p>
</CardContent>
</Card>


<Card className="bg-zinc-900 border border-zinc-800">
<CardHeader className="flex justify-between">
<CardTitle className="text-sm text-zinc-400">
Current Students
</CardTitle>
<Users className="text-blue-400"/>
</CardHeader>

<CardContent>
<div className="text-3xl font-bold text-white">
{totalStudents}
</div>
<div className="text-green-500">+120 last 30 days</div>
</CardContent>
</Card>


<Card className="bg-zinc-900 border border-zinc-800">
<CardHeader className="flex justify-between">
<CardTitle className="text-sm text-zinc-400">
Staff
</CardTitle>
<UserCheck className="text-purple-400"/>
</CardHeader>

<CardContent>
<div className="text-3xl font-bold text-white">
65
</div>
</CardContent>
</Card>


<Card className="bg-zinc-900 border border-zinc-800">
<CardHeader className="flex justify-between">
<CardTitle className="text-sm text-zinc-400">
Teachers
</CardTitle>
<Users className="text-blue-700"/>
</CardHeader>

<CardContent>
<div className="text-3xl font-bold text-white">
30
</div>
<div className="text-green-600">+2 this month</div>
</CardContent>
</Card>

</div>


{/* STUDENT PIE + ATTENDANCE */}

<div className="flex flex-col lg:flex-row gap-4">

<Card className="bg-slate-900 border border-slate-800 lg:w-[40%]">

<CardHeader>
<CardTitle className="text-slate-300 text-sm">
Students
</CardTitle>
</CardHeader>

<CardContent className="flex flex-col items-center">

<PieChart width={240} height={240}>

<Pie
data={studentData}
dataKey="value"
innerRadius={70}
outerRadius={100}
stroke="none"
>

{studentData.map((entry,index)=>(
<Cell key={index} fill={entry.color}/>
))}

</Pie>

<text
x="50%"
y="50%"
textAnchor="middle"
dominantBaseline="middle"
className="fill-white text-xl font-bold"
>
{totalStudents}
</text>

<text
x="50%"
y="60%"
textAnchor="middle"
dominantBaseline="middle"
className="fill-gray-400 text-xs"
>
Students
</text>

</PieChart>

{/* legend */}

<div className="flex gap-6 mt-3 text-sm">

<span className="flex items-center gap-2 text-blue-400">
<div className="w-3 h-3 rounded-full bg-blue-500"></div>
Boys
</span>

<span className="flex items-center gap-2 text-yellow-400">
<div className="w-3 h-3 rounded-full bg-yellow-400"></div>
Girls
</span>

</div>

</CardContent>
</Card>



{/* ATTENDANCE */}

<Card className="bg-slate-900 border border-slate-800 lg:w-[60%]">

<CardHeader>
<CardTitle className="text-slate-300 text-sm">
Attendance
</CardTitle>
</CardHeader>

<CardContent className="h-64">

<ResponsiveContainer width="100%" height="100%">

<BarChart data={attendanceData}>

<XAxis dataKey="day" stroke="#94a3b8"/>
<YAxis stroke="#94a3b8"/>

<Tooltip
contentStyle={{
background:"#020617",
border:"none",
color:"#fff"
}}
cursor={{fill:"transparent"}}
/>

<Bar dataKey="present" stackId="a" fill="#facc15"/>
<Bar dataKey="absent" stackId="a" fill="#3b82f6"/>

</BarChart>

</ResponsiveContainer>

</CardContent>
</Card>

</div>


{/* MOST DEMANDED COURSES */}

<Card className="bg-slate-900 border border-slate-800">

<CardHeader>
<CardTitle className="text-slate-300">
Most Demanded Courses (Last 3 Months)
</CardTitle>
</CardHeader>

<CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

{demandedCourses.map((course,index)=>(
<div
key={index}
className="bg-slate-800 hover:bg-slate-700 transition p-4 rounded-lg flex justify-between"
>
<span className="text-white">{course.name}</span>
<span className="text-emerald-400">{course.admission}</span>
</div>
))}

</CardContent>

</Card>


{/* REVENUE GRAPH */}

<div className="bg-slate-950 border border-slate-800 rounded-xl p-6 h-[400px]">

<h2 className="text-white mb-4 text-lg font-semibold">
Revenue vs Expenses
</h2>

<ResponsiveContainer width="100%" height="90%">

<LineChart data={revenueData}>

<CartesianGrid stroke="#1e293b"/>

<XAxis dataKey="year"/>
<YAxis/>

<Tooltip
contentStyle={{
background:"#020617",
border:"none",
color:"#fff"
}}
/>

<Legend/>

<Line type="monotone" dataKey="revenue" stroke="#22c55e"/>
<Line type="monotone" dataKey="expenses" stroke="#ef4444"/>

</LineChart>

</ResponsiveContainer>

</div>

</div>


{/* RIGHT SIDEBAR */}

<div className="lg:w-[30%] flex flex-col gap-8 items-center">

{/* TOP COMPANIES */}

<Card className="bg-slate-900 border border-slate-800 w-full max-w-[320px]">

<CardHeader>
<CardTitle className="text-white">
Top Placement Companies
</CardTitle>
</CardHeader>

<CardContent className="flex flex-col gap-3">

{companies.map((company,index)=>(
<div
key={index}
className="flex justify-between items-center bg-slate-800 hover:bg-slate-700 transition px-4 py-2 rounded-lg"
>

<span className="text-gray-200 font-medium">
{company}
</span>

<span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">
Hiring
</span>

</div>
))}

</CardContent>

</Card>


{/* RECENT PLACEMENTS */}

<Card className="bg-slate-900 border border-slate-800 w-full max-w-[320px]">

<CardHeader>
<CardTitle className="text-white text-sm">
Recent Placements
</CardTitle>
</CardHeader>

<CardContent className="flex flex-col gap-3">

<div className="flex justify-between bg-slate-800 px-3 py-2 rounded">
<span className="text-gray-200 text-sm">Rahul</span>
<span className="text-emerald-400 text-xs">Google</span>
</div>

<div className="flex justify-between bg-slate-800 px-3 py-2 rounded">
<span className="text-gray-200 text-sm">Priya</span>
<span className="text-blue-400 text-xs">Microsoft</span>
</div>

<div className="flex justify-between bg-slate-800 px-3 py-2 rounded">
<span className="text-gray-200 text-sm">Aman</span>
<span className="text-yellow-400 text-xs">Amazon</span>
</div>

</CardContent>
</Card>


{/* AVG SALARY */}

<Card className="bg-slate-900 border border-slate-800 w-full max-w-[320px]">

<CardHeader>
<CardTitle className="text-white text-sm">
Average Salary Package
</CardTitle>
</CardHeader>

<CardContent className="flex flex-col gap-3">

<div className="flex justify-between">
<span className="text-gray-400">Highest</span>
<span className="text-emerald-400">₹18 LPA</span>
</div>

<div className="flex justify-between">
<span className="text-gray-400">Average</span>
<span className="text-blue-400">₹7.5 LPA</span>
</div>

<div className="flex justify-between">
<span className="text-gray-400">Lowest</span>
<span className="text-red-400">₹3.2 LPA</span>
</div>

</CardContent>
</Card>


{/* SUCCESS RATE */}

<Card className="bg-slate-900 border border-slate-800 w-full max-w-[320px]">

<CardHeader>
<CardTitle className="text-white text-sm">
Placement Success Rate
</CardTitle>
</CardHeader>

<CardContent className="text-center">

<p className="text-4xl font-bold text-emerald-400">
82%
</p>

<p className="text-gray-400 text-sm">
Students placed this year
</p>

<div className="w-full bg-slate-800 h-2 rounded mt-3">

<div className="bg-emerald-400 h-2 rounded w-[82%]"></div>

</div>

</CardContent>

</Card>

</div>

</div>

)
}

export default Dashboard
