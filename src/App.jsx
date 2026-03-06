import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import NewTask from './Pages/NewTask'
import EditTask from './Pages/EditTask.jsx'
import AllTask from './Pages/AllTask.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/new' element={<NewTask />}/>
        <Route path='/edit/:id' element={<EditTask />}/>
        <Route path='/all' element={<AllTask />}/>
      </Routes>
    </>
  )
}

export default App
