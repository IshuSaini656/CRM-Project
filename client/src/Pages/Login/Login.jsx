import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosLock } from "react-icons/io";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import api from "../../utils/apicall.js";

import toast from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange", // live validation
  });

  const navigate = useNavigate();

  const onsubmit = async (data) => {
    try {
      const logIn = await api.post("/login", data);
      if(logIn.data?.data?.accessToken){
      localStorage.setItem("accessToken",logIn.data.data.accessToken) 
      }
      toast.success(logIn.data.message)
      if(logIn.data.data.isVerified==true){
        navigate("/role")
      }else{
      navigate("/otp", { state: { email: data.email } });
      }
      reset();
    } catch(err) {
      toast.error(err.response?.data?.message || "something went wrong")
    }
  };

  return (
    <div className="login-bg flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="border-2 bg-black/40 backdrop-blur-lg border-white/50 shadow-lg rounded-xl p-10 min-w-[30vw] min-h-[70vh] flex justify-center items-center flex-col gap-4">
          <h3 className="text-white text-4xl font-extrabold pb-6 mb-8">
            Login
          </h3>

          {/* Email Input */}
          <div className="w-[90%] mb-2">
            <div className="relative border-2 border-white rounded-3xl text-white flex items-center px-3 py-1 bg-gray/50">
              <input
                type="email"
                placeholder="Email"
                className="outline-none w-[90%] bg-transparent"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid Email",
                  },
                })}
              />

              <CgProfile />
            </div>
            {/* Fixed height for error message */}
            <div className="h-4 font-medium pl-4">
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Password Input */}
          <div className="w-[90%] mb-2">
            <div className="relative border-2 border-white rounded-3xl text-white flex items-center px-3 py-1 bg-gray/50">
              <input
                type="password"
                placeholder="Password"
                className="outline-none w-[90%] bg-transparent"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be min. 8 characters",
                  },
                })}
              />
              <IoIosLock />
            </div>
            {/* Fixed height for error message */}
            <div className="h-4 pl-4 font-medium">
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-[80%] text-white font-bold rounded-3xl p-2 mt-4
              ${
                !isValid
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
              }`}
          >
            {!isSubmitting ? "Login" : <ClipLoader color="#ffffff" size={15} />}
          </button>
          <p className="text-yellow-300 text-sm font-light text-center w-[90%]">
            Note : If you forget password contact with admin
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
