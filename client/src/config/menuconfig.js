import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePeople } from "react-icons/md";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { FaUser, FaUserPlus, FaBook } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";

const menuItems = [
    {
        name: "Dashboard",
        icon : IoHomeOutline,
        path: "/role",
        roles: ["admin", "hr", "counsellor"]
    },
    {
        name: "Student",
        icon: MdOutlinePeople,
        path: "/role/student",
        roles: ["admin", "hr"]
    },
    {
        name: "Courses",
        icon: FaBook,
        path: "/role/courses",
        roles: ["admin","hr"]
    },
    {
        name: "Placements",
        icon: PiStudent,
        path: "/role/placements",
        roles: ["admin", "counsellor"]
    },
    {
        name: "Resume",
        icon: HiOutlineNewspaper,
        path: "/role/resume",
        roles: ["admin", "counsellor"]
    },
    {
        name: "Alumni",
        icon: PiStudent,
        path: "/role/alumni",
        roles: ["admin", "counsellor"]
    },
    {
        name: "Create-user",
        icon: FaUserPlus,
        path: "/role/createuser",
        roles: ["admin"]   // user create usually admin ka kaam hota hai
    },
    {
        name: "Profile",
        icon: FaUser,
        path: "/role/profile",
        roles: ["admin", "hr", "counsellor"]
    }
]

export default menuItems