import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<UserList />} />
          <Route path='/user/:id' element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
