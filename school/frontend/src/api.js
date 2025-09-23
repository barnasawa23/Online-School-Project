import axios from 'axios';

const Api = axios.create({
    baseURL:'http://localhost:5000/api'
});

export const fetchSchool = async () => {
    const response = await Api.get('/allSchool');
    return response.data;
};

export const addSchool = async ( newSchool ) => {
    const response = await Api.post('/addSchool', newSchool);
    return response.data;
};

export const deleteSchool = async (id) => {
    const response = await Api.delete(`/deleteSchool/${id}`);
    return response.data;
}

export const updateSchool = async (id, updatedSchool) => {
    const response = await Api.put(`/updateSchool/${id}`, updatedSchool);
    return response.data;
}

export const onlineData = async () => {
    const response = await axios.get('https://restcountries.com/v3.1/name/Rwanda');
    return response.data;
};

export const fetchSchoolById = async (id) => {
    const response = await Api.get(`/getSchool/${id}`);
    return response.data;
}
