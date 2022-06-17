import React from 'react';
import './index.css';
import { useState, useEffect } from "react"
import Header from './componets/Header';
import Events from './componets/Events';
import AddTask from './componets/AddTask';
import Footer from './componets/Footer';
import Button from './componets/Button';

function App() {

  //toggle add button
  const [showForm, setForm] = useState( false )
  const onShow = () => setForm(!showForm)
  const showAdd =  showForm

  const [tasks, setTask] =useState ([])

  useEffect(() => {
    const getTasks = async () => {
       const dataFromServer = await fetchTasks()
       setTask(dataFromServer)
    }

    getTasks()
  }, [])

  // fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  //toggle reminder on server
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

    //add events/task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = res.json()

    setTask([...tasks, data])

    /*const id = Math.floor(Math.random() * 1000) + 1
    const newTask = {id, ...task}
    setTask([...tasks, newTask])*/
  }


   //delete events/task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTask(tasks.filter((task) => task.id !== id))
  }          

   //toggle Reminder
   const setReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method:'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)

    })

    const data = await res.json()

    setTask(tasks.map((task) => task.id === id ? 
    {...task, reminder: data.reminder} : task))
   }
   return (
    <div>
      <Header title="Task Tracker" />
      <div className="task-card">
      {showForm && <AddTask onAdd={addTask} />}
        <div className='task-parent'>
            <h2 className='title'>Events/Task</h2>
            <Button  onClick={onShow} text={showAdd ? 'Close' : 'Add'} color={showAdd ? 'rgb(179, 32, 32)' : 'rgb(0, 128, 0)'} />
        </div>
        {tasks.length > 0 ? (<Events tasks={tasks} onDelete={deleteTask} onToggle={setReminder} />) : 
        (<p className='no-task'>No tasks to show, Add task</p>)}
    </div>
    <Footer />
    </div>
  );
}


export default App;
