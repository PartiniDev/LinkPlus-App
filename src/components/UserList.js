import React, { useEffect, useMemo, useState } from 'react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { fetchData } from '../utils/api'

ModuleRegistry.registerModules([AllCommunityModule])

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const columnDefs = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Name',
        sortable: true,
        // filter: true,
        flex: 1,
      },
      {
        field: 'email',
        headerName: 'Email',
        sortable: true,
        // filter: true,
        flex: 1,
      },
      {
        field: 'company',
        headerName: 'Company',
        sortable: true,
        // filter: true,
        flex: 1,
        valueGetter: (params) => params.data?.company?.name || '',
      },
    ],
    []
  )

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchData(
          'https://jsonplaceholder.typicode.com/users'
        )
        setUsers(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    getUsers()
  }, [])

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
      <h2 className='mb-4'>User Management</h2>

      <div
        style={{
          height: '600px',
          width: '100%',
          marginBottom: '20px',
        }}
      >
        <AgGridReact
          rowData={users}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          animateRows={true}
        />
      </div>
    </div>
  )
}

export default UserList
