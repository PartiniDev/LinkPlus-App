import { createSlice } from '@reduxjs/toolkit'
import { fetchData } from '../utils/api'

export const getUsersFromAPI = async () => {
  try {
    const response = await fetchData(
      'https://jsonplaceholder.typicode.com/users'
    )

    return response
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

const initialState = {
  users: [],
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },

    addUser: (state, action) => {
      state.users.unshift(action.payload)
    },

    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      )

      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload }
      }
    },

    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload)
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const {
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  setLoading,
  setError,
} = userSlice.actions
export default userSlice.reducer
