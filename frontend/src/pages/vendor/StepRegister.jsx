import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { useVendorForm } from "../../context/VendorFormContext";

export default function StepRegister({ next, back }) {
  const { formData, updateMultipleFields } = useVendorForm();
  const [isLoading, setIsLoading] = useState(false);

  const schema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .test(
        "company-domain",
        "Please use your company domain email ",
        (value) => {
          if (!value) return false;
          // Reject gmail.com addresses
          return !/^[^@\s]+@gmail\.com$/i.test(value);
        }
      ),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <div className="w-full">
      {/* Role Badge */}
      <div className="flex justify-center mb-6">
        <span className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
          {formData.role || "Vendor"}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Register
      </h2>

      <Formik
        initialValues={{
          email: formData.email || "",
          password: formData.password || "",
          confirmPassword: "",
        }}
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={async (values) => {
          setIsLoading(true);

          try {
            // Send OTP request
            const response = await fetch(
              "http://localhost:5001/api/request-otp",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: values.email }),
              }
            );

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.message || "Failed to send OTP");
            }

            // Update form data and proceed to OTP verification
            updateMultipleFields({
              email: values.email,
              password: values.password,
            });

            toast.success("OTP sent to your email!");
            next();
          } catch (error) {
            toast.error(
              error.message || "Failed to send OTP. Please try again."
            );
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-2 ml-4">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-2 ml-4">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 text-sm mt-2 ml-4">
                  {errors.confirmPassword}
                </p>
              )}
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
                type="submit"
                disabled={isLoading}
                className="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending OTP..." : "Proceed"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
