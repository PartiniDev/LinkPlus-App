import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa'

function EditUserForm({ show, user, onUpdateUser, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    company: '',
    address: '',
    city: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        website: user.website || '',
        company: user.company?.name || '',
        address: user.address?.street || '',
        city: user.address?.city || '',
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const updatedUser = {
      name: formData.name,
      username: formData.name.toLowerCase().replace(/\s+/g, ''),
      email: formData.email,
      address: {
        ...user.address,
        street: formData.address || 'N/A',
        city: formData.city || 'N/A',
      },
      phone: formData.phone || 'N/A',
      website: formData.website || 'N/A',
      company: {
        ...user.company,
        name: formData.company || 'N/A',
      },
    }

    onUpdateUser(updatedUser)
  }

  if (!user) return null

  return (
    <Modal show={show} onHide={onCancel} size='lg' centered>
      <Modal.Header closeButton className='bg-warning text-dark'>
        <Modal.Title>
          <FaEdit className='me-2' />
          Edit User: {user.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label fw-medium'>
              Name <span className='text-danger'>*</span>
            </label>
            <input
              type='text'
              name='name'
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter full name'
            />
            {errors.name && (
              <div className='invalid-feedback'>{errors.name}</div>
            )}
          </div>

          <div className='mb-3'>
            <label className='form-label fw-medium'>
              Email <span className='text-danger'>*</span>
            </label>
            <input
              type='email'
              name='email'
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter email address'
            />
            {errors.email && (
              <div className='invalid-feedback'>{errors.email}</div>
            )}
          </div>

          <div className='row'>
            <div className='col-md-6 mb-3'>
              <label className='form-label fw-medium'>Phone</label>
              <input
                type='text'
                name='phone'
                className='form-control'
                value={formData.phone}
                onChange={handleChange}
                placeholder='Enter phone number'
              />
            </div>

            <div className='col-md-6 mb-3'>
              <label className='form-label fw-medium'>Website</label>
              <input
                type='text'
                name='website'
                className='form-control'
                value={formData.website}
                onChange={handleChange}
                placeholder='example.com'
              />
            </div>
          </div>

          <div className='mb-3'>
            <label className='form-label fw-medium'>Company</label>
            <input
              type='text'
              name='company'
              className='form-control'
              value={formData.company}
              onChange={handleChange}
              placeholder='Enter company name'
            />
          </div>

          <div className='row'>
            <div className='col-md-8 mb-3'>
              <label className='form-label fw-medium'>Address</label>
              <input
                type='text'
                name='address'
                className='form-control'
                value={formData.address}
                onChange={handleChange}
                placeholder='Street address'
              />
            </div>

            <div className='col-md-4 mb-3'>
              <label className='form-label fw-medium'>City</label>
              <input
                type='text'
                name='city'
                className='form-control'
                value={formData.city}
                onChange={handleChange}
                placeholder='City'
              />
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onCancel}>
          <FaTimes className='me-2' />
          Cancel
        </Button>
        <Button variant='warning' onClick={handleSubmit}>
          <FaSave className='me-2' />
          Update User
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditUserForm
