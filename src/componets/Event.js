import { FaTimes } from 'react-icons/fa'

const Event = ({task, onDelete, onToggle}) => {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`}
    id = 'event'
    onDoubleClick={() => onToggle(task.id)}>
        <h3>
            {task.text}{''}
        </h3>
        <p className='flex'>
            {`${task.date} at ${task.time}`} 
            <FaTimes 
                style={{color: 'red', cursor: 'pointer'}}
                onClick={() => onDelete(task.id)} 
            />
        </p>
    </div>
  )
}

export default Event