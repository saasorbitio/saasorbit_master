import { useState } from "react";
import { useVendorForm } from "../../context/VendorFormContext";

export default function StepRole({ next }) {
  const { formData, updateField } = useVendorForm();
  const [selectedRole, setSelectedRole] = useState(formData.role);

  const roles = ["User", "Vendor", "Media"];

  const handleNext = () => {
    if (selectedRole) {
      updateField("role", selectedRole);
      next();
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-lg text-gray-700 mb-2">Let us know your profile</p>
        <h2 className="text-3xl font-bold text-gray-900">Register as</h2>
      </div>

      {/* Role Selection Buttons */}
      <div className="flex flex-col gap-4 mb-16">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`w-full py-5 px-8 rounded-full text-xl font-medium transition-all ${
              selectedRole === role
                ? "bg-gray-700 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => window.history.back()}
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
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full transition-colors"
        >
          Next
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
