import { useState } from "react"

const AddTask = ({ onAdd }) => {

    const [text, setText] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [reminder, setRemind] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!text) {
            alert("Please enter text")
            return
        }

        onAdd({text, date, time, reminder})

        setText('')
        setDate('')
        setTime('')
        setRemind(false)
    }

  return (
    <form className="form" onSubmit={onSubmit}>
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
            <label htmlFor="set reminder" className="bold set-reminder">Set Reminder</label>
            <input type="checkbox"
            checked={reminder}
             value={reminder} 
             onChange={(e) => setRemind(e.currentTarget.checked)} />
        </legend>

        <input type="submit" value="save" className="submit" />
    </form>
  )
}

export default AddTask