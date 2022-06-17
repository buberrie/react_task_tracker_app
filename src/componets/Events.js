import Event from "./Event"

const Events = ({ tasks, onDelete, onToggle }) => {
  return (
    <div className= 'events task-detial'>
        {tasks.map((task, index) => (
        <Event 
            key={index} 
            task={task} 
            onDelete={onDelete}
            onToggle={onToggle}/>
        ))}
    </div>
  )
}

export default Events