import { useEffect, useState } from "react";
import axios from "axios";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [studentId, setStudentId] = useState(localStorage.getItem('studentId') || "");
  const [search, setSearch] = useState("");

  const fetchCourses = async () => {
    const res = await axios.get("https://enrollment-system-backend-production.up.railway.app/api/courses");
    // Yahan filter lagao
    const myEnrolled = res.data.filter(c =>
      c.enrolledStudents && c.enrolledStudents.includes(studentId)
    );
    setCourses(myEnrolled);
  }

  useEffect(() => {
    if(studentId) fetchCourses()
  }, [studentId]);

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{padding: '10px'}}>
      <h1 className="text-2xl font-semibold">My Courses</h1>
      <p className="mt-4"><b>Total Enrolled:</b> {courses.length}</p>

      <input
        placeholder="Student id"
        className="border-b-neutral-700 rounded-lg outline-none border-2"
        value={studentId}
        onChange={e => {setStudentId(e.target.value); localStorage.setItem('studentId', e.target.value)}}
        style={{padding: '8px', marginRight: '10px' , marginTop:'10px'}}
      />
      <input
        placeholder="Search"
        value={search}
        className="border-b-neutral-700 rounded-lg border-2 outline-none"
        onChange={e => setSearch(e.target.value)}
        style={{padding: '8px'}}
      />

      {filtered.length === 0? (
        <p style={{marginTop: '20px'}}>No courses enrolled yet</p>
      ) : (
        filtered.map(course => (
          <div className="bg-gray-200" key={course._id} style={{border: '1px solid #ccc', margin: '15px 0', padding: '15px', borderRadius: '8px'}}>
            <h3 className="font-semibold text-2xl">{course.title}</h3>
            <p>{course.description}</p>
            <p><b>Seats:</b> {course.enrolledStudents.length} / {course.capacity}</p>
          </div>
        ))
      )}
    </div>
  )
}
export default MyCourses;
