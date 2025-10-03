import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { FaExclamationTriangle, FaTrash, FaTimes } from 'react-icons/fa'

function DeleteConfirmModal({ show, user, onConfirm, onCancel }) {
  if (!user) return null

  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton className='bg-danger text-white'>
        <Modal.Title>
          <FaExclamationTriangle className='me-2' />
          Confirm Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='text-center py-3'>
          <div className='mb-3'>
            <FaExclamationTriangle className='text-danger' size={48} />
          </div>
          <h5 className='mb-3'>Are you sure you want to delete this user?</h5>

          <div className='bg-light rounded p-3 mb-3'>
            <div className='d-flex align-items-center'>
              <div
                className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3'
                style={{ width: '50px', height: '50px' }}
              >
                {user.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <h6 className='mb-1 fw-bold'>{user.name}</h6>
                <small className='text-muted'>{user.email}</small>
                <br />
                <small className='text-muted'>{user.company?.name}</small>
              </div>
            </div>
          </div>

          <p className='text-muted mb-0'>
            This action cannot be undone. All user data will be permanently
            removed.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onCancel}>
          <FaTimes className='me-2' />
          Cancel
        </Button>
        <Button variant='danger' onClick={onConfirm}>
          <FaTrash className='me-2' />
          Delete User
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmModal
