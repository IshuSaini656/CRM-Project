import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import api from "../../utils/apicall";
import toast from "react-hot-toast"
const CreateUser = () => {

const [form,setForm] = useState({
name:"",
email:"",
phone:"",
role:"",
password:""
});

const handleChange = (e)=>{
setForm({
...form,
[e.target.name]:e.target.value
});
};

const handleSubmit = async(e)=>{
e.preventDefault();
try{
 await api.post("/admin/create-user",form);
    toast.success("user Created Successfully")
    setForm({
    name:"",
    email:"",
    phone:"",
    role:"",
    password:""
    });
} catch(error){
    toast.error(error.response?.data)
}

};

return (

<div className="bg-slate-950 h-[75vh] p-6 flex justify-center items-center">

<div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-xl p-8">

{/* HEADER */}

<div className="flex items-center gap-3 mb-6">

<div className="bg-indigo-600 p-2 rounded-lg">
<UserPlus className="text-white"/>
</div>

<h2 className="text-xl font-semibold text-white">
Create New User
</h2>

</div>

{/* FORM */}

<form
onSubmit={handleSubmit}
className="grid md:grid-cols-2 gap-6"
>

{/* NAME */}

<div>

<label className="text-sm text-slate-400 block mb-1">
Name
</label>

<input
type="text"
name="name"
value={form.name}
onChange={handleChange}
placeholder="Enter name"
className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
/>

</div>


{/* EMAIL */}

<div>

<label className="text-sm text-slate-400 block mb-1">
Email
</label>

<input
type="email"
name="email"
value={form.email}
onChange={handleChange}
placeholder="Enter email"
className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
/>

</div>


{/* PHONE */}

<div>

<label className="text-sm text-slate-400 block mb-1">
Phone
</label>

<input
type="text"
name="phone"
value={form.phone}
onChange={handleChange}
placeholder="Enter phone"
className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
/>

</div>


{/* ROLE */}

<div>

<label className="text-sm text-slate-400 block mb-1">
Role
</label>

<select
name="role"
value={form.role}
onChange={handleChange}
className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
>

<option value="">
Select Role
</option>

<option value="hr">
Hr
</option>

<option value="consellor">
Counsellor
</option>

</select>

</div>


{/* PASSWORD */}

<div className="md:col-span-2">

<label className="text-sm text-slate-400 block mb-1">
Password
</label>

<input
type="password"
name="password"
value={form.password}
onChange={handleChange}
placeholder="Enter password"
className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
/>

</div>


{/* BUTTON */}

<div className="md:col-span-2">

<button
type="submit"
className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg transition"
>

Create User

</button>

</div>

</form>

</div>

</div>

);

};

export default CreateUser;