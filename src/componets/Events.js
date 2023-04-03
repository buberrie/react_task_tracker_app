import Event from "./Event"

const Events = ({ tasks, onDelete, onToggle, getTaskId, onEdit, completedId }) => {
  return (
    <div className= 'events task-detial'>
        {tasks.map((task) => (
        <Event 
            key={task.id} 
            task={task} 
            onDelete={onDelete}
            onToggle={onToggle}
            getTaskId={getTaskId}
            completedId={completedId}
            onEdit={onEdit} />
        ))}
    </div>
  )
}

export default Events
