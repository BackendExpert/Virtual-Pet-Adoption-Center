import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Quize from './pages/Optional/Quize'


function App() {


  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage /> } />
          <Route path='/Quiz' element={<Quize /> } />
        </Routes>
      </BrowserRouter>
  )
}

export default App
