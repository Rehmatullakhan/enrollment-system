import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Courses from "./pages/Courses";
import MyCourses from "./pages/MyCourses";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter> {/* <-- YE SAB SE BAHAR HONA CHAHIYE */}
      <div className="min-h-screen bg-cyan-300 font-sans">
        
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-indigo-600 to-blue-600 shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <span className="text-white text-xl font-bold">ERP System</span>
              </div>
              <div className="flex gap-6">
                <NavLink to="/" end className={({ isActive }) => `flex items-center px-2 py-4 text-sm font-medium text-white border-b-4 ${isActive ? "border-white" : "border-transparent hover:border-white/50"}`}>
                  Courses
                </NavLink>
                <NavLink to="/my-courses" className={({ isActive }) => `flex items-center px-2 py-4 text-sm font-medium text-white border-b-4 ${isActive ? "border-white" : "border-transparent hover:border-white/50"}`}>
                  My Courses
                </NavLink>
                <NavLink to="/admin" className={({ isActive }) => `flex items-center px-2 py-4 text-sm font-medium text-white border-b-4 ${isActive ? "border-white" : "border-transparent hover:border-white/50"}`}>
                  Admin
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        {/* Pages */}
        <main className="py-8">
          <Routes>
            <Route path="/" element={<Courses />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App;
