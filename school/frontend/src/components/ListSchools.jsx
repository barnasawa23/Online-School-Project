import { useState, useEffect } from 'react';
import  {deleteSchool, fetchSchool, onlineData}  from '../api';
import { useNavigate } from 'react-router-dom';


const ListSchool = () => {
    const [schools, setSchools] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSchool()
            .then((data) => {
                setSchools(data);
            })
            .catch((error) => {
                console.error('Error fetching schools:', error);
            });

        onlineData()
            .then((data) => {
                setCountryData(data);
            })
            .catch((error) => {
                console.error('Error fetching country data:', error);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteSchool(id);
            alert('School deleted successfully!');
            
            const updatedList = await fetchSchool(); // fetch updated data
            setSchools(updatedList); // update UI
        } catch (error) {
            console.error('Error deleting school:', error);
            alert('Failed to delete school');
        }
    };
    

    const handleEdit = (id) => {
        // console.log("Navigating to", `/updateSchool/${id}`);
        navigate(`/updateSchool/${id}`);
    };



    return (
        <div>
            {
                schools.map((item) => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.phone}</p>
                        <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} style={{ width: '100px', height: '100px' }} />
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                        <button onClick={() => handleEdit(item.id)}>Get</button>
                    </div>
                ))
            }
            <button onClick={() => navigate('/addSchool')}>Add School</button>

            <h1>Country Data</h1>
            {
                countryData.map((country)=> (
                    <div key={country.name.common}>
                        {/* <p>{country.name}</p> */}
                        <p>{country.capital}</p>
                        <p>{country.population}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default ListSchool;