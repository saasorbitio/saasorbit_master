import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useVendorForm } from "../../context/VendorFormContext";
import StepRole from "./StepRole";
import StepRegister from "./StepRegister";
import StepOTP from "./StepOTP";
import StepCompany from "./StepCompany";
import StepContact from "./StepContact";
import StepSocial from "./StepSocial";
import StepTerms from "./StepTerms";
import StepSuccess from "./VendorComplete";

export default function VendorRegister() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formData } = useVendorForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      console.log("Submitting form data:", formData);
      const response = await axios.post("/api/vendor/register", formData);

      if (response.data.success) {
        toast.success("Registration successful! 🎉");

        // Auto-login after successful registration
        const userData = {
          email: formData.email,
          name: formData.companyName,
          role: formData.role || "vendor",
        };

        // Generate a temporary token or use the one from response if available
        const token = response.data.token || "temp-token-" + Date.now();
        login(token, userData);

        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white w-full max-w-[600px] rounded-[40px] px-10 py-12 shadow-xl">
      {step === 0 && <StepRole next={next} />}
      {step === 1 && <StepRegister next={next} back={back} />}
      {step === 2 && <StepOTP next={next} back={back} />}
      {step === 3 && <StepCompany next={next} back={back} />}
      {step === 4 && <StepContact next={next} back={back} />}
      {step === 5 && <StepSocial next={next} back={back} />}
      {step === 6 && (
        <StepTerms
          back={back}
          onSubmit={handleFinalSubmit}
          isSubmitting={isSubmitting}
        />
      )}
      {step === 7 && <StepSuccess />}
    </div>
  );
}
