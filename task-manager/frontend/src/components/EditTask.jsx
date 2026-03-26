import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'

const EditTask = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState({ name: '', completed: false })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { task: taskData } } = await axios.get(`/api/v1/tasks/${id}`)
        if (taskData) {
          setTask({ name: taskData.name, completed: taskData.completed })
        }
      } catch (error) {
        console.error('Fetch task error:', error.response?.data || error.message);
        navigate('/', { state: { error: 'Error fetching task' } });
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updateData = { ...task }
      await axios.patch(`/api/v1/tasks/${id}`, updateData)
      navigate('/?edited=true')
    } catch (error) {
      console.error('Update task error:', error.response?.data || error.message);
      navigate('/', { state: { error: 'Error updating task' } });
    }
  }

  if (loading) return <div className="loading-text">Loading...</div>

  return (
    <form className="glass-card single-task-form" onSubmit={handleSubmit}>
      <h4>edit task</h4>
      <div className="form-control">
        <label htmlFor="task-name">task name</label>
        <input
          type="text"
          id="task-name"
          name="name"
          className="task-edit-name"
          value={task.name}
          onChange={(e) => setTask({...task, name: e.target.value})}
        />
      </div>
      <div className="form-control">
        <label htmlFor="task-completed">completed</label>
        <input
          type="checkbox"
          name="completed"
          id="task-completed"
          className="task-edit-completed"
          checked={task.completed}
          onChange={(e) => setTask({...task, completed: e.target.checked})}
        />
      </div>
      <button type="submit" className="btn task-edit-btn">
        save changes
      </button>
      <Link to="/" className="back-link">← Back to tasks</Link>
    </form>
  )
}

export default EditTask
