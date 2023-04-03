import { useEffect } from "react"

const AddTask = (props) => {
    
    const onSubmit = async (e) => {
        e.preventDefault()
        if (props.id !== undefined && props.id !== '') {
            await props.updateTask(props.id)
            props.setTaskId("")
        } else {
            props.addTask()
        }

        props.setDate("")
        props.setText("")
        props.setComplete(false)
        props.setTime("")
    }

    const editHandler = async () => {
        const docSnap = await props.getTask(props.id)
        props.setText(docSnap.data().text)
        props.setTime(docSnap.data().time)
        props.setDate(docSnap.data().date)
        props.setComplete(docSnap.data().completed)
      }

    useEffect(() => {
        if (props.id !== undefined && props.id !== '') {
            editHandler()
        }
    }, [props.id])



  return (
    <form className="form" onSubmit={onSubmit} id="addTask" >
        <legend className="form-control">
            <label htmlFor="title" className="block bold">Task</label>
            
            <input type="text" 
             placeholder="Add Event/task" 
             className={`input ${props.error ? "error" : ""}`} 
             value={props.text}
             onChange={(e) => props.setText(e.target.value)} />
        </legend>
        <legend className="form-control">
            <label htmlFor="Date" className="block bold">Date</label>
            <input type="date" 
             placeholder="Set date" 
             className="input"
             value={props.date}
             onChange={(e) => props.setDate(e.target.value)} />
        </legend>
        <legend className="form-control">
            <label htmlFor="Time" className="block bold" >Time</label>
            <input type="time"
             placeholder="Set time" 
             className="input"
             value={props.time}
             onChange={(e) => props.setTime(e.target.value)} />
        </legend>
        <legend className="form-control">
            <label htmlFor="Completed" className="bold set-completed">Completed</label>
            <input type="checkbox"
             checked={props.completed}
             onChange={(e) => props.setComplete(e.currentTarget.checked)} />
        </legend>

        <button type="submit" className="submit" 
            style={{backgroundColor: props.id ? 'rgb(0, 51, 0)	' : 'rgb(14, 1, 35)'}}>
            {
                props.id ? "Update" : "save"
            }
        </button>
    </form>
  )

}

export default AddTask