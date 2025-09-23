// Comments API
export const fetchComments = async (schoolId) => {
  const response = await Api.get(`/comments/${schoolId}`);
  return response.data;
};

export const addComment = async (schoolId, text) => {
  const response = await Api.post('/comment', { schoolId, text });
  return response.data;
};

// Likes API
export const fetchLikes = async (schoolId) => {
  const response = await Api.get(`/likes/${schoolId}`);
  return response.data;
};

export const likeSchool = async (schoolId) => {
  const response = await Api.post('/like', { schoolId });
  return response.data;
};

export const unlikeSchool = async (schoolId) => {
  const response = await Api.post('/unlike', { schoolId });
  return response.data;
};
import axios from 'axios';

// Create an Axios instance
const Api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// ✅ Add a request interceptor to include the token in all requests
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API Functions

export const fetchSchool = async () => {
  const response = await Api.get('/allSchool');
  return response.data;
};

export const addSchool = async (newSchool) => {
  const response = await Api.post('/addSchool', newSchool, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteSchool = async (id) => {
  const response = await Api.delete(`/deleteSchool/${id}`);
  return response.data;
};

export const updateSchool = async (id, updatedSchool) => {
  const response = await Api.put(`/updateSchool/${id}`, updatedSchool);
  return response.data;
};

export const onlineData = async () => {
  const response = await axios.get('https://restcountries.com/v3.1/name/Rwanda');
  return response.data;
};

export const fetchSchoolById = async (id) => {
  const response = await Api.get(`/getSchool/${id}`);
  return response.data;
};

export default Api;
