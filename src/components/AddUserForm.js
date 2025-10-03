import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

function AddUserForm({ show, onAddUser, onCancel }) {
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

    const newUser = {
      id: Date.now(),
      name: formData.name,
      username: formData.name.toLowerCase().replace(/\s+/g, ''),
      email: formData.email,
      address: {
        street: formData.address || 'N/A',
        suite: '',
        city: formData.city || 'N/A',
        zipcode: '',
        geo: {
          lat: '0',
          lng: '0',
        },
      },
      phone: formData.phone || 'N/A',
      website: formData.website || 'N/A',
      company: {
        name: formData.company || 'N/A',
        catchPhrase: '',
        bs: '',
      },
    }

    onAddUser(newUser)

    setFormData({
      name: '',
      email: '',
      phone: '',
      website: '',
      company: '',
      address: '',
      city: '',
    })
  }

  return (
    <Modal show={show} onHide={onCancel} size='lg' centered>
      <Modal.Header closeButton className='bg-success text-white'>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>
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
            <label className='form-label'>
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
              <label className='form-label'>Phone</label>
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
              <label className='form-label'>Website</label>
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
            <label className='form-label'>Company</label>
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
              <label className='form-label'>Address</label>
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
              <label className='form-label'>City</label>
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
          Cancel
        </Button>
        <Button variant='success' onClick={handleSubmit}>
          Add User
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddUserForm
