import React, { useState, useRef, useEffect } from "react";
import otpImage from "../../assets/otpimage.png";
import { ClipLoader } from "react-spinners";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/apicall";
import toast from "react-hot-toast";

function OTPVerification() {
  const [otp, setotp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);
  const [timeLeft, setTimeleft] = useState(59);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.email) {
      navigate("/");
    }
  }, [location , navigate]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeleft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setotp(newOtp);
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }

    if (newOtp.join("").length == 6) {
      handelOtpVerify(newOtp.join(""));
    }
  };
  const handelOtpVerify = async (verifyOtp) => {
    setLoading(true);
    try {
      const res = await api.post("/otp-verify", { otp: verifyOtp, email: location.state.email });
        if (res.data?.data?.accessToken) {
          localStorage.setItem("accessToken", res.data.data.accessToken);
        }
      toast.success(res.data.message);
      navigate("/role");
    } catch (err) {
      toast.error(err.response?.data.message);
    }
    setLoading(false);
  };
  
  const handleKeyDown = (e, index) => {
    if (e.key == "Backspace" && index > 0 && !otp[index]) {
      inputsRef.current[index - 1].focus();
    }
  };
  
  const resendOtp = async()=>{
    try{
      const newOtp = await api.post("/otp-resend",{email : location.state.email});
      toast.success(newOtp.data.message)
      setTimeleft(59)
      setotp(["", "", "", "", "", ""]);
    }catch(err){
       toast.error(err.response?.data.message);
    }
  }

  return (
    <div className="login-bg flex justify-center items-center min-h-screen">
      <div className="border-2 bg-black/40 backdrop-blur-md border-white/50 shadow-lg rounded-xl p-10 min-w-[30vw] min-h-[70vh] flex     justify-center items-center flex-col gap-4 ">
        <img src={otpImage} alt="" className="h-40" />
        <span className="text-white font-extrabold text-3xl mb-2">
          OTP Verification
        </span>
        <span className="text-white text-sm tracking-widest font-bold text-shadow-amber-300 mb-2">
          Enter the 6 digit code sent to your email
        </span>
        <div className="text-white text-2xl font-bold flex gap-4">
          {otp.map((digit, index) => {
            return (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => {
                  handleChange(e.target.value, index);
                }}
                onKeyDown={(e) => {
                  handleKeyDown(e, index);
                }}
                className="border-2 border-white/60 h-14 w-11 rounded-xl text-center bg-white/10 outline-none focus:border-indigo-700"
              ></input>
            );
          })}
        </div>
        <div>
          <ClipLoader size={28} color="#ffffff" loading={loading} />
        </div>
        <div className="flex flex-col w-full">
          <span className="text-gray-300 text-left pl-7 ">
            {timeLeft > 0 ? (
              <p>00:{timeLeft}</p>
            ) : (
              <p>
                OTP expired.
                <button
                  className="text-blue-700 underline text-center pl-1 cursor-pointer active:text-gray-400"
                  onClick={resendOtp}
                >
                  Resend OTP
                </button>
              </p>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;
