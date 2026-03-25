// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

const TasksList = ({ tasks, onDelete }) => {
  if (tasks.length < 1) {
    return <h5 className="empty-list">No tasks in your list</h5>
  }

  return (
    <div className="tasks">
      {tasks.map((task) => {
        const { _id, completed, name } = task
        return (
          <div key={_id} className="glass-card single-task">
            <h5 className={completed ? 'task-completed' : ''}>
              <span>
                <i className={`far ${completed ? 'fa-check-circle' : 'fa-circle'}`} ></i>
              </span>
              {name}
            </h5>
            <div className="task-links">
              <a href={`/edit/${_id}`} className="edit-link">
                <i className="fas fa-edit"></i>
              </a>
              <button 
                type="button" 
                className="delete-btn" 
                onClick={() => onDelete(_id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TasksList
