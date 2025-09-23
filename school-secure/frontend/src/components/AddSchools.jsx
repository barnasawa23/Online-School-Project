import { useState } from "react";
import { addSchool } from "../api";
import { useNavigate } from "react-router-dom";

const AddSchool = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !phone || !image) return;
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('image', image); // important: actual file object
    
        try {
            await addSchool(formData);
            setName('');
            setPhone('');
            setImage(null);
            alert('School added successfully!');
            navigate('/')
        } catch (error) {
            console.error('Error adding school:', error);
        }
    };
    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    return (
        <div>
            <h2>Add School</h2>
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
                <button type="submit">Add School</button>
            </form>
        </div>
    )
}


export default AddSchool;