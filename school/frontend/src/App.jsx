import ListSchool from './components/listSchools'
import './App.css'
import AddSchool from './components/AddSchools';
import UpdateSchool from './components/UpdateSchool';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<ListSchool />} />
        <Route path='/allSchool' element={<ListSchool />} />
        <Route path='/addSchool' element={<AddSchool />} />
        <Route path='/updateSchool/:id' element={<UpdateSchool />} />
      </Routes>
    </Router>
  )
}

export default App
