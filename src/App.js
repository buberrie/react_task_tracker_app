import React from 'react';
import './index.css';
import { useState, useEffect } from "react"
import Header from './componets/Header';
import Events from './componets/Events';
import AddTask from './componets/AddTask';
import Footer from './componets/Footer';
import Button from './componets/Button';
import { addDoc, collection, getDoc, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore"; 
import { db } from "./firebase-config";

function App() {

  const [text, setText] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [completed, setComplete] = useState(false)
  const [error, setError] = useState(false)


  //toggle add button
  const [showForm, setForm] = useState( false )
  const onShow = () => setForm(!showForm)
  const showAdd =  showForm

  const onEdit = () => setForm(showForm ? showForm : !showForm)

  // realtime fetch Tasks
  const [tasks, setTask] = useState ([])

  useEffect(() => {
      /*const getTasks = async () => {
        let list = []
        try {
          const querySnapshot = await getDocs(collection(db, "tasks"));
          querySnapshot.forEach((doc) => {
            list.push({id: doc.id, ...doc.data() })
          })
          setTask(list)
      } catch (error) {
        console.log(error)
      }
    }
    getTasks()*/
    const unsub = onSnapshot(collection(db, "tasks"), (snapShot) => {
      let list = []
      snapShot.docs.forEach((doc) => {
        list.push({id: doc.id, ...doc.data() })
      })
      setTask(list)
  },
  (error) => {
    console.log(error)
  }
  )
    return () => {
      unsub()
    }
  }, [])

  //add events/task to backend 
  const addTask = async () => {
    if (text.length === 0) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 5000);
    } else {
      await addDoc(collection(db, "tasks" ), {
        text, date, time, completed
      })
    }
  }

   //delete events/task from backend
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id)) 
      setTask((tasks.filter((task) => task.id !== id)))
    } catch (error) {
      console.log(error)
    }
  }   
 
  //update/edit task; different steps are involved  
  //First get indiviual task to be updated
  const getTask = (id) => {
    return getDoc(doc(db, "tasks", id))
  }

  // get the Id of each task to be edited, it's values will be displayed on the UI
  const [taskId, setTaskId] = useState('')
  const getTaskIdHandler = (id) => {
    setTaskId(id)
  }

  // Then update
  const updateTask =  async (id) => {
    try {
        await updateDoc(doc(db, 'tasks', id), {
          text, date, time, completed
        })
    } catch (error) {
      console.log(error)
    }
  }

   //toggle completed
  
   const setCompleted =  async (id) => {
      setComplete(!completed)

    
    //update to backend
    try {
        await updateDoc(doc(db, 'tasks', id), {
          completed
        })
      } catch (error) {
        console.log(error)
      }
  }

   return (
    <div>
      <Header title="Task Tracker" />
      <div className="task-card">
        {showForm && <AddTask addTask={addTask}
          getTask={getTask} 
          updateTask={updateTask}
          id={taskId}
          setTaskId={setTaskId}
          setDate={setDate} 
          date={date}
          setComplete={setComplete}
          completed={completed} 
          setText={setText}
          text={text}
          setTime={setTime}
          time={time} 
          error={error} />}
          <div className='task-parent'>
              <h2 className='title'>Event/Task</h2>
              <Button  onClick={onShow} text={showAdd ? 'Close' : 'Add'} 
              color={showAdd ? 'rgb(179, 32, 32)' : 'rgb(0, 128, 0)'} />
          </div>
        {tasks.length > 0 ? (<Events 
          tasks={tasks}
          onEdit={onEdit} 
          getTaskId={getTaskIdHandler}
          onDelete={deleteTask}
          onToggle={setCompleted}
          completed={completed}/>) : 
          (<p className='no-task'>No tasks to show, Add task</p>)}
      </div>
      <Footer />
    </div>
  );
}


export default App;
