import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/SaasOrbit_logo 1.svg";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center px-6 xl:px-20 py-5 bg-white">
      {/* Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="SaasOrbit Logo" className="h-12" />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-sm text-gray-700 font-medium">
              Welcome, {user?.name || user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="px-6 py-3 rounded-3xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors shadow-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-3xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm"
          >
            Login
          </button>
        )}
        <button className="px-6 py-2 rounded-3xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm">
          Contact Us
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 font-medium">Ind</span>
          <img
            src="https://flagcdn.com/w40/in.png"
            alt="India"
            className="w-7 h-7 rounded-3xl shadow-sm"
          />
        </div>
      </div>
    </header>
  );
}
