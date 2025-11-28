import { useState } from "react";
import { useVendorForm } from "../../context/VendorFormContext";
import { toast } from "react-toastify";

export default function StepOTP({ next, back }) {
  const { formData } = useVendorForm();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter complete OTP");
      return;
    }

    setIsVerifying(true);

    // Verify OTP (static verification for now)
    if (enteredOtp === "000555") {
      setTimeout(() => {
        toast.success("OTP verified successfully!");
        setIsVerifying(false);
        next();
      }, 1000);
    } else {
      setTimeout(() => {
        toast.error("Invalid OTP. Please use 000555");
        setIsVerifying(false);
      }, 1000);
    }
  };

  const handleResend = () => {
    toast.info("OTP resent to your email");
    setOtp(["", "", "", "", "", ""]);
    document.getElementById("otp-0")?.focus();
  };

  return (
    <div className="w-full">
      {/* Role Badge */}
      <div className="flex justify-center mb-6">
        <span className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
          {formData.role || "Vendor"}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        OTP Verification
      </h2>

      {/* Subtitle */}
      <p className="text-center text-gray-600 mb-8">
        We've sent a code to{" "}
        <span className="font-semibold text-gray-900">{formData.email}</span>
      </p>

      {/* OTP Input Boxes */}
      <div className="flex justify-center gap-3 mb-8">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-14 text-center text-2xl font-semibold bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      {/* Resend Link */}
      <div className="text-center mb-8">
        <button
          type="button"
          onClick={handleResend}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          Didn't receive code? Resend
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          type="button"
          onClick={back}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-full transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        <button
          type="button"
          onClick={handleVerify}
          disabled={isVerifying}
          className="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
}
