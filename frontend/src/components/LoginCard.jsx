import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginCard() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6).required("Required"),
  });

  return (
    <div className="bg-white w-full max-w-[600px] rounded-[50px] px-10 py-8 shadow-xl">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-lg text-gray-700 mb-1">Welcome to</p>
        <h1 className="text-xl font-semibold text-gray-900">
          Socio-SaaS Network
        </h1>
      </div>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={async (values) => {
          try {
            const { data } = await axios.post("/api/auth/login", values);

            // Save token and full vendor profile (if available)
            const userData = data.vendor ||
              data.user || {
                email: values.email,
                name: "User",
                role: "user",
              };
            login(data.token, userData);

            toast.success("🎉 Login successful!");
            navigate("/home");
          } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-6">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-small text-gray-900 mb-1">
                Registered Email ID
              </label>
              <Field
                name="email"
                type="email"
                placeholder="Email ID"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-sm placeholder-gray-400 placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-2 ml-4"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-small text-gray-900 mb-1">
                Password
              </label>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-full text-sm placeholder-gray-400 placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm mt-2 ml-4"
              />
              <p className="text-right font-semibold text-xs text-gray-500 mt-2 mr-2 cursor-pointer">
                Forgot User ID / Password?
              </p>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2 rounded-full mt-1 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Processing..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>

      {/* Divider */}
      <div className="flex items-center gap-2 my-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-gray-600 text-xs font-small cursor-pointer">
          Or Log in with
        </span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Social Login Buttons */}
      <div className="flex justify-center gap-3 mb-8">
        <button className="flex items-center gap-2 px-2 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-xs text-gray-700 cursor-pointer">Google</span>
        </button>

        <button className="flex items-center gap-2 px-2 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0078D4">
            <path d="M23.5 10.5h-11v-11h11v11zm-12 0h-11v-11h11v11zm0 1v11h-11v-11h11zm1 0h11v11h-11v-11z" />
          </svg>
          <span className="text-xs text-gray-700 cursor-pointer">Outlook</span>
        </button>

        <button className="flex items-center gap-2 px-2 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          <span className="text-xs text-gray-700 cursor-pointer">LinkedIn</span>
        </button>
      </div>

      {/* Register Link */}
      <p className="text-center text-xs text-gray-700 cursor-pointer">
        Don't have an account?{" "}
        <span
          className="text-[#00ABFB] font-semibold cursor-pointer hover:underline cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </div>
  );
}
