import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/' element={<UserList />} />
            <Route path='/user/:id' element={<UserDetails />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
