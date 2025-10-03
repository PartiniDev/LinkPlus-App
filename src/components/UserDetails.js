import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Avatar from 'react-avatar'
import {
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaMapMarkerAlt,
  FaBuilding,
  FaArrowLeft,
} from 'react-icons/fa'
import { fetchData } from '../utils/api'

function UserDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        if (location.state?.user) {
          setUser(location.state.user)
          setLoading(false)
        } else {
          const data = await fetchData(
            `https://jsonplaceholder.typicode.com/users/${id}`
          )
          setUser(data)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
      }
    }

    getUserDetails()
  }, [id, location.state])

  if (loading) {
    return (
      <div className='text-center mt-5'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className='container mt-5'>
        <div className='alert alert-danger'>User not found</div>
        <button className='btn btn-primary' onClick={() => navigate('/')}>
          Back to Users
        </button>
      </div>
    )
  }

  return (
    <div className='container mt-4'>
      <button className='btn btn-secondary mb-4' onClick={() => navigate('/')}>
        <FaArrowLeft className='me-2' />
        Back to Users
      </button>

      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6'>
          <div
            className='card shadow'
            style={{ borderRadius: '15px', overflow: 'hidden' }}
          >
            <div className='bg-primary text-white p-3'>
              <h5 className='mb-0'>
                <FaBuilding className='me-2' />
                {user?.company?.name}
              </h5>
              <small>{user?.company?.catchPhrase}</small>
            </div>

            <div className='card-body p-4'>
              <div className='row'>
                <div className='col-4 text-center border-end'>
                  <Avatar
                    name={user?.name}
                    size='80'
                    round={true}
                    className='mb-2'
                  />
                  <h6 className='mb-0' style={{ fontSize: '0.9rem' }}>
                    @{user?.username}
                  </h6>
                </div>

                <div className='col-8'>
                  <h4 className='mb-3'>{user?.name}</h4>

                  <div className='mb-2'>
                    <FaEnvelope className='me-2 text-primary' />
                    <small>
                      <a
                        href={`mailto:${user?.email}`}
                        className='text-decoration-none'
                      >
                        {user?.email}
                      </a>
                    </small>
                  </div>

                  <div className='mb-2'>
                    <FaPhone className='me-2 text-success' />
                    <small>
                      <a
                        href={`tel:${user?.phone}`}
                        className='text-decoration-none'
                      >
                        {user?.phone}
                      </a>
                    </small>
                  </div>

                  <div className='mb-2'>
                    <FaGlobe className='me-2 text-info' />
                    <small>
                      <a
                        href={`http://${user?.website}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-decoration-none'
                      >
                        {user?.website}
                      </a>
                    </small>
                  </div>

                  <div className='mt-3'>
                    <FaMapMarkerAlt className='me-2 text-danger' />
                    <small className='text-muted'>
                      {user?.address?.street}, {user?.address?.city}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
