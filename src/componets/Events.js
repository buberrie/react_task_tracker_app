import Event from "./Event"

const Events = ({ tasks, onDelete, onToggle, getTaskId, onEdit }) => {
  return (
    <div className= 'events task-detial'>
        {tasks.map((task, index) => (
        <Event 
            key={index} 
            task={task} 
            onDelete={onDelete}
            onToggle={onToggle}
            getTaskId={getTaskId}
            onEdit={onEdit} />
        ))}
    </div>
  )
}

export default Events
