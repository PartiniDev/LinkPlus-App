import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { FaEdit, FaTrash, FaPlus, FaBuilding } from 'react-icons/fa'
import {
  setUsers,
  deleteUser,
  addUser,
  updateUser,
  setLoading,
} from '../store/userSlice'
import { getUsersFromAPI } from '../store/userSlice'
import AddUserForm from './AddUserForm'
import EditUserForm from './EditUserForm'
import DeleteConfirmModal from './DeleteConfirmModal'

ModuleRegistry.registerModules([AllCommunityModule])

function UserList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { users, loading } = useSelector((state) => state.users)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const handleRowClick = (event) => {
    navigate(`/user/${event.data.id}`, { state: { user: event.data } })
  }

  const handleAddUser = (newUser) => {
    dispatch(addUser(newUser))
    setShowAddForm(false)
  }

  const handleUpdateUser = (updatedUser) => {
    const userToUpdate = {
      id: selectedUser.id,
      ...updatedUser,
    }

    dispatch(updateUser(userToUpdate))
    setShowEditForm(false)
    setSelectedUser(null)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setShowEditForm(true)
  }

  const handleDeleteUser = (user) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (selectedUser) {
      dispatch(deleteUser(selectedUser.id))
      setShowDeleteModal(false)
      setSelectedUser(null)
    }
  }

  const filteredUsers = users.filter((user) => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.company?.name?.toLowerCase().includes(searchLower)
    )
  })

  const columnDefs = [
    {
      field: 'name',
      headerName: 'Name',
      sortable: true,
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: true,
      flex: 1,
    },
    {
      field: 'company',
      headerName: 'Company',
      sortable: true,
      flex: 1,
      valueGetter: (params) => params.data?.company?.name || 'N/A',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      flex: 0.8,
      cellRenderer: (params) => (
        <div className='d-flex gap-2' onClick={(e) => e.stopPropagation()}>
          <button
            className='btn btn-sm btn-outline-primary'
            onClick={(e) => {
              e.stopPropagation()
              handleEditUser(params.data)
            }}
            title='Edit User'
          >
            <FaEdit />
          </button>
          <button
            className='btn btn-sm btn-outline-danger'
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteUser(params.data)
            }}
            title='Delete User'
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ]

  useEffect(() => {
    const loadUsers = async () => {
      dispatch(setLoading(true))
      try {
        const usersData = await getUsersFromAPI()
        dispatch(setUsers(usersData))
      } catch (error) {
        console.error('Error loading users:', error)
      } finally {
        dispatch(setLoading(false))
      }
    }

    loadUsers()
  }, [dispatch])

  if (loading) {
    return (
      <div className='text-center mt-5'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className='container-fluid mt-4 px-4'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div>
          <h2 className='mb-1'>
            <FaBuilding className='me-2' />
            User Management
          </h2>
          <p className='text-muted mb-0'>Manage your team members</p>
        </div>
        <button
          className='btn btn-success'
          onClick={() => setShowAddForm(true)}
        >
          <FaPlus className='me-2' />
          Add New User
        </button>
      </div>

      <div className='row mb-4'>
        <div className='col-md-6 col-lg-4'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by name, email, or company...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='col-md-6 col-lg-8 d-flex align-items-center'>
          <small className='text-muted'>
            Showing {filteredUsers.length} of {users.length} users
          </small>
        </div>
      </div>

      <div className='border rounded'>
        <div
          style={{
            height: '600px',
            width: '100%',
          }}
        >
          <AgGridReact
            rowData={filteredUsers}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={15}
            onRowClicked={(event) => {
              if (event.event.target.closest('.btn')) {
                return
              }
              handleRowClick(event)
            }}
            rowStyle={{ cursor: 'pointer' }}
            defaultColDef={{
              resizable: true,
              sortable: true,
            }}
          />
        </div>
      </div>

      <AddUserForm
        show={showAddForm}
        onAddUser={handleAddUser}
        onCancel={() => setShowAddForm(false)}
      />

      <EditUserForm
        show={showEditForm}
        user={selectedUser}
        onUpdateUser={handleUpdateUser}
        onCancel={() => {
          setShowEditForm(false)
          setSelectedUser(null)
        }}
      />

      <DeleteConfirmModal
        show={showDeleteModal}
        user={selectedUser}
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteModal(false)
          setSelectedUser(null)
        }}
      />
    </div>
  )
}

export default UserList
