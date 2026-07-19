import { useEffect, useState } from "react";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [studentId, setStudentId] = useState(localStorage.getItem('studentId') || "");
  const [search, setSearch] = useState("");

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:5000/api/courses");
    setCourses(res.data);
  }

  useEffect(() => { fetchCourses() }, []);

  const handleEnroll = async (courseId) => {
    if(!studentId) return alert("Enter your Student ID first");
    localStorage.setItem('studentId', studentId);
    
    try {
      await axios.post("http://localhost:5000/api/enroll", {studentId, courseId});
      alert("Enrolled Successfully! ✅");
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  }

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="  max-w-6xl mx-auto">
        
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Available Courses</h2>
        
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <input 
            placeholder="Enter Your Student ID" 
            value={studentId} 
            onChange={e => setStudentId(e.target.value)}
            className="px-4 py-2 border-blue-500 border-2 rounded-lg  outline-none w-full md:w-1/3"
          />
          <input 
            placeholder="Search Course..." 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 border-blue-500 border-2 rounded-lg  outline-none w-full"
          />
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(course => {
            const enrolledCount = course.enrolledStudents?.length || 0;
            const isEnrolled = course.enrolledStudents?.includes(studentId);
            const isFull = enrolledCount >= course.capacity;
            const progress = course.capacity > 0 ? (enrolledCount / course.capacity) * 100 : 0;

            return (
              <div key={course._id} className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                  {isFull && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">FULL</span>}
                </div>
                
                <p className="text-gray-600 text-sm mb-4 h-12 overflow-hidden">{course.description}</p>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Seats</span>
                    <span className="font-medium">{enrolledCount} / {course.capacity}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-300 ${isFull ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <button 
                  onClick={() => handleEnroll(course._id)} 
                  disabled={isEnrolled || isFull}
                  className={`w-full py-2.5 rounded-lg font-semibold transition
                    ${isEnrolled ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 
                      isFull ? 'bg-red-300 text-white cursor-not-allowed' : 
                      'bg-blue-600 hover:bg-blue-700 text-white'}`}
                >
                  {isEnrolled ? "Already Enrolled" : isFull ? "Course Full" : "Enroll Now"}
                </button>
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No courses found</p>
        )}
      </div>
    </div>
  )
}
export default Courses;