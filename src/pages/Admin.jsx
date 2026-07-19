import { useState } from "react";
import axios from "axios";

function Admin() {
  // 1. state banana zaroori hai
  const [form, setForm] = useState({ 
    title: "", 
    description: "", 
    capacity: "" 
  });

  // 2. har input ke liye 1 hi function
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 3. submit function
  const addCourse = async (e) => {
    e.preventDefault(); // page reload na ho
    try {
      await axios.post("https://enrollment-system-backend-production.up.railway.app/api/courses", form);
      alert("Course Added! ✅");
      setForm({ title: "", description: "", capacity: "" }); // form clear
    } catch(err) {
      alert("Error adding course");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-3 lg:px-4">
      <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white">⚙️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Panel - Add Course</h2>
        </div>
        
        <form onSubmit={addCourse} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Course Title</label>
            <input 
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange} // <-- YE LAGA DIYA
              className="w-full px-2 py-1.5 border-gray-300 border rounded-lg outline-none" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea 
              rows="3" 
              name="description"
              value={form.description}
              onChange={handleChange} // <-- YE LAGA DIYA
              className="w-full px-4 py-1.5 border-gray-300 border rounded-lg  outline-none"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Capacity</label>
            <input 
              type="number" 
              name="capacity"
              value={form.capacity}
              onChange={handleChange} // <-- YE LAGA DIYA
              className="w-full px-2 py-1.5 border-gray-300 border rounded-lg outline-none" 
              required
            />
          </div>

          <button 
            type="submit" // onClick ki jagah form pe onSubmit behtar hai
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg"
          >
            + Add Course
          </button>
        </form>
      </div>
    </div>
  )
}

export default Admin;
