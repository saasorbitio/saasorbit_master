import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/SaasOrbit_logo 1.svg";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      await logout();
      navigate("/", { replace: true });
    }
  };

  const handleLogoClick = () => {
    // If authenticated, ask for logout confirmation before going to "/"
    if (isAuthenticated) {
      const confirmed = window.confirm("Are you sure you want to logout?");
      if (confirmed) {
        logout();
        navigate("/", { replace: true });
      }
    } else {
      navigate("/");
    }
  };

  return (
    <header className="flex justify-between items-center px-6 xl:px-20 py-5 bg-white">
      {/* Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={handleLogoClick}
        role="button"
        tabIndex={0}
        aria-label="SaasOrbit home"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleLogoClick();
          }
        }}
      >
        {/* responsive heights: smaller on xs, larger on md */}
        <img src={logo} alt="SaasOrbit Logo" className="h-12 sm:h-14 md:h-16" />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* {isAuthenticated ? (
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
        )} */}
        <button
          className="flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-2 rounded-3xl bg-blue-500 text-white text-sm sm:text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm cursor-pointer"
          aria-label="Chat with us"
        >
          {/* Chat icon (visible on all sizes) */}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.874L3 20l1.874-4.745A9.863 9.863 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg> */}

          {/* Full label on small screens and up; short label on xs */}
          <span className="hidden sm:inline">Chat with Us</span>
          <span className="sm:hidden">Chat</span>
        </button>
        {/* <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 font-medium">Ind</span>
          <img
            src="https://flagcdn.com/w40/in.png"
            alt="India"
            className="w-7 h-7 rounded-3xl shadow-sm"
          />
        </div> */}
      </div>
    </header>
  );
}
