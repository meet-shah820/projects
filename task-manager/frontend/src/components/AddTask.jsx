import React, { useState } from 'react'
import axios from 'axios'

const AddTask = ({ onAdd, showSuccess, showError }) => {
  const [name, setName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      showError('Please enter a task name')
      return
    }
    try {
      await axios.post('/api/v1/tasks', { name: name.trim() })
      showSuccess('Success, task added!')
      setName('')
      if (onAdd) onAdd()
    } catch {
      showError('Error adding task, please try again')
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h4>task manager</h4>
      <div className="form-control">
        <input
          type="text"
          name="name"
          className="task-input"
          placeholder="e.g. wash dishes"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn submit-btn">
          submit
        </button>
      </div>
    </form>
  )
}

export default AddTask
