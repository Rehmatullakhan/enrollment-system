import axios from 'axios';
const API = "https://enrollment-system-backend-production.up.railway.app/api";

export const getCourses = () => axios.get(`${API}/courses`);
export const createCourse = (data) => axios.post(`${API}/courses`, data);
export const enrollCourse = (data) => axios.post(`${API}/enroll`, data);
export const getMyCourses = (id) => axios.get(`${API}/students/${id}/courses`);
export const registerStudent = (data) => axios.post(`${API}/register`, data);