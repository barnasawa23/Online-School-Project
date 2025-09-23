import { useState, useEffect } from 'react';
import  {deleteSchool, fetchSchool, onlineData, fetchComments, addComment, fetchLikes, likeSchool, unlikeSchool}  from '../api';
import { useNavigate } from 'react-router-dom';


const ListSchool = () => {
    const [schools, setSchools] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [comments, setComments] = useState({});
    const [commentInput, setCommentInput] = useState({});
    const [likes, setLikes] = useState({});
    const [liked, setLiked] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchSchool()
            .then((data) => {
                setSchools(data);
                // Fetch comments and likes for each school
                data.forEach(school => {
                    fetchComments(school.id).then(coms => {
                        setComments(prev => ({ ...prev, [school.id]: coms }));
                    });
                    fetchLikes(school.id).then(likeData => {
                        setLikes(prev => ({ ...prev, [school.id]: likeData.likeCount }));
                    });
                });
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



    // Add comment handler
    const handleAddComment = async (schoolId) => {
        if (!commentInput[schoolId]) return;
        try {
            await addComment(schoolId, commentInput[schoolId]);
            const coms = await fetchComments(schoolId);
            setComments(prev => ({ ...prev, [schoolId]: coms }));
            setCommentInput(prev => ({ ...prev, [schoolId]: '' }));
        } catch (error) {
            alert('Failed to add comment');
        }
    };

    // Like/unlike handlers
    const handleLike = async (schoolId) => {
        try {
            await likeSchool(schoolId);
            const likeData = await fetchLikes(schoolId);
            setLikes(prev => ({ ...prev, [schoolId]: likeData.likeCount }));
            setLiked(prev => ({ ...prev, [schoolId]: true }));
        } catch (error) {
            alert('Failed to like');
        }
    };
    const handleUnlike = async (schoolId) => {
        try {
            await unlikeSchool(schoolId);
            const likeData = await fetchLikes(schoolId);
            setLikes(prev => ({ ...prev, [schoolId]: likeData.likeCount }));
            setLiked(prev => ({ ...prev, [schoolId]: false }));
        } catch (error) {
            alert('Failed to unlike');
        }
    };

    return (
        <div>
            {schools.map((item) => (
                <div key={item.id} style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
                    <p>{item.name}</p>
                    <p>{item.phone}</p>
                    <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} style={{ width: '100px', height: '100px' }} />
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                    <button onClick={() => handleEdit(item.id)}>Get</button>
                    <div>
                        <button onClick={() => handleLike(item.id)} disabled={liked[item.id]}>Like</button>
                        <button onClick={() => handleUnlike(item.id)} disabled={!liked[item.id]}>Unlike</button>
                        <span>Likes: {likes[item.id] || 0}</span>
                    </div>
                    <div>
                        <h4>Comments</h4>
                        {(comments[item.id] || []).map((c) => (
                            <div key={c.id}>
                                <b>{c.username}:</b> {c.text}
                            </div>
                        ))}
                        <input
                            type="text"
                            value={commentInput[item.id] || ''}
                            onChange={e => setCommentInput(prev => ({ ...prev, [item.id]: e.target.value }))}
                            placeholder="Add a comment"
                        />
                        <button onClick={() => handleAddComment(item.id)}>Add Comment</button>
                    </div>
                </div>
            ))}
            <button onClick={() => navigate('/addSchool')}>Add School</button>
            <h1>Country Data</h1>
            {countryData.map((country)=> (
                <div key={country.name.common}>
                    <p>{country.capital}</p>
                    <p>{country.population}</p>
                </div>
            ))}
        </div>
    );
};

export default ListSchool;