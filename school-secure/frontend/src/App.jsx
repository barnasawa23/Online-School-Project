import ListSchool from './components/listSchools'
import './App.css'
import AddSchool from './components/AddSchools';
import UpdateSchool from './components/UpdateSchool';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/users/Register';
import Login from './components/users/Login';
import PrivateRoute from './components/PrivateRoutes';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <ListSchool />
          </PrivateRoute>
        } />
        <Route path='/allSchool' element={
          <PrivateRoute>
            <ListSchool />
          </PrivateRoute>
        } />
        <Route path='/addSchool' element={
          <PrivateRoute>
            <AddSchool />
          </PrivateRoute>
        } />
        <Route path='/updateSchool/:id' element={
          <PrivateRoute>
            <UpdateSchool />
          </PrivateRoute>
        } />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App
