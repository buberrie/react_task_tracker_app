import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'

const AddTask = ({ onAdd, updateTask, setDate, date, setComplete, completed, setText, text, time, setTime, getTask, id, setTaskId}) => {

    
    const onSubmit = async (e) => {
        e.preventDefault()
        if (id !== undefined && id !== '') {
            await updateTask(id)
            setTaskId("")
        } else {
            onAdd()
        }

        setDate("")
        setText("")
        setComplete(false)
        setTime("")
    }

    const editHandler = async () => {
        const docSnap = await getTask(id)
        setText(docSnap.data().text)
        setTime(docSnap.data().time)
        setDate(docSnap.data().date)
        setComplete(docSnap.data().completed)
      }

    useEffect(() => {
        if (id !== undefined && id !== '') {
            editHandler()
        }
    }, [id])



  return (
    <form className="form" onSubmit={onSubmit} id="addTask" >
        <legend className="form-control">
            <label htmlFor="title" className="block bold">Task</label>
            
            <input type="text" 
             placeholder="Add Event/task" 
             className="input" 
             value={text}
             onChange={(e) => setText(e.target.value)} />
        </legend>
        <legend className="form-control">
            <label htmlFor="Date" className="block bold">Date</label>
            <input type="date" 
             placeholder="Set date" 
             className="input"
             value={date}
             onChange={(e) => setDate(e.target.value)} />
        </legend>
        <legend className="form-control">
            <label htmlFor="Time" className="block bold" >Time</label>
            <input type="time"
             placeholder="Set time" 
             className="input"
             value={time}
             onChange={(e) => setTime(e.target.value)} />
        </legend>
        <legend className="form-control">
            <label htmlFor="Completed" className="bold set-completed">Completed</label>
            <input type="checkbox"
            checked={completed}
             value={completed} 
             onChange={(e) => setComplete(e.currentTarget.checked)} />
        </legend>

        <button type="submit" className="submit" disabled={ !text } 
            style={{backgroundColor: id ? 'rgb(0, 51, 0)	' : 'rgb(14, 1, 35)'}}>
            {
                id ? "Update" : "save"
            }
        </button>
    </form>
  )

}

export default AddTask