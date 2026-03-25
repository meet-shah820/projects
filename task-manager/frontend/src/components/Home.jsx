import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddTask from "./AddTask";
import TasksList from "./TasksList";

const Home = ({ onAdd, tasks, onDelete }) => {
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')

  const navigate = useNavigate();

  const showSuccess = (msg) => {
    setShowAlert(true);
    setAlertMsg(msg);
    setTimeout(() => {
        setShowAlert(false);
        setAlertMsg('');
      }, 3000);
  };

  const showError = (msg) => {
    setShowAlert(true);
    setAlertMsg(msg);
    setTimeout(() => {
      setShowAlert(false);
      setAlertMsg('');
    }, 3000);
  };

  const handleDelete = (id) => {
    onDelete(id);
    showSuccess('Success, Task Deleted');
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('edited') === 'true') {
      setTimeout(() => {
        setShowAlert(true)
        setAlertMsg('Success, task edited')
        setTimeout(() => {
          setShowAlert(false);
          onAdd();
          navigate('/', { replace: true });
        }, 1500)

      }, 0)
    }
  }, [location.search, navigate])

  return (
    <>
      {showAlert && (
        <div className="glass-card form-alert text-success">
          {alertMsg}
        </div>
      )}
      <div className="glass-card task-form">
        <AddTask onAdd={onAdd} showSuccess={showSuccess} showError={showError} />
      </div>
      <section className="tasks-container">
        <TasksList tasks={tasks} onDelete={handleDelete} />
      </section>
    </>
  );
};

export default Home;
