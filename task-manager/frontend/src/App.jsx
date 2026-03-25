import { React,  useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import TasksList from './components/TasksList'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'
import './App.css'
import './index.css'

const App = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const { data: { tasks: taskList } } = await axios.get('/api/v1/tasks')
        setTasks(taskList)
      } catch (error) {
        console.error('Load tasks error:', error.response?.data || error.message)
      }
    }
    loadTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const { data: { tasks: taskList } } = await axios.get('/api/v1/tasks')
      setTasks(taskList)
    } catch (error) {
      console.error('Fetch tasks error:', error.response?.data || error.message)
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/v1/tasks/${id}`)
      fetchTasks()
    } catch (error) {
      console.error('Delete task error:', error.response?.data || error.message)
    }
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home onAdd={fetchTasks} tasks={tasks} onDelete={deleteTask} />} />
          <Route path="/edit/:id" element={<EditTask />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
