import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      setMessage(res.data.message);

      if (res.status === 200) {
        const token = res.data.token;
        if (token) {
          localStorage.setItem('token', token); // ✅ Save token to localStorage
          navigate('/addSchool');
        } else {
          setMessage('Login succeeded but no token received');
        }
      }

    } catch (err) {
      setMessage(err.response?.data?.message || 'Error occurred');
    }
  };

  const handleButton = () => {
    navigate('/register');
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button type="submit">Login</button>
        <button type="submit" onClick={handleButton}>register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;