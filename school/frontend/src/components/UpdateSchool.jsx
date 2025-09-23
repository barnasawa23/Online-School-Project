import React, { useState, useEffect } from 'react';
import { fetchSchoolById, updateSchool } from '../api';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateSchool = () => {
    const { id: schoolId } = useParams();   
    const [school, setSchool] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState('');

    const navigate = useNavigate();




    useEffect(() => {
        const loadSchool = async () => {
            try {
                const data = await fetchSchoolById(schoolId);
                setSchool(data);
                setName(data.name);
                setPhone(data.phone);
                setExistingImage(data.image);
            } catch (error) {
                console.error("Error fetching school data:", error);
            }
        };
        loadSchool();
    }, [schoolId]);
    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setImage(file);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !phone) return;
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
    
        if (image) {
            formData.append('image', image);
        } else {
            formData.append('existingImage', existingImage); // send existing filename
        }
    
        try {
            await updateSchool(schoolId, formData);
            alert('School updated successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error updating school:', error);
        }
    };
    

    if(!school) return <div>Loading...</div>;

  return (
    <div>
            <h2>Update School</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="add School"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="add Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input 
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <button type="submit">Update School</button>
            </form>
        </div>
  )
}
export default UpdateSchool;