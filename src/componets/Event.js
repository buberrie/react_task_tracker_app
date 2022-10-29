import { FaTimes } from 'react-icons/fa'
import { AiFillEdit } from 'react-icons/ai'
import {BsCheckCircleFill} from 'react-icons/bs'

const Event = ({task, onDelete, onToggle, getTaskId, onEdit  }) => {

  //const navigate = useNavigate()

  //const [checked, setChecked] = useState(false)
  //const onCheck = setChecked(!checked)

  const handleOnEdit = () => {
    onEdit()
    getTaskId(task.id)
  }

  return (
    <div className="wrapper-event">    
      <BsCheckCircleFill
        className = {`comp ${task.completed ? 'completed' : ''}`}        
        onClick={()=> onToggle(task.id)}>
      </BsCheckCircleFill>
      <div className= "task"
        id = 'event'
        onDoubleClick={() => onToggle(task.id)}>
        <h3 className='flex'>
            {task.text}
            <a href="#addTask"> <AiFillEdit
              onClick={() => handleOnEdit()}
              style={{color: 'rgb(0, 51, 0)	', cursor: 'pointer', fontSize:'15px'}}
              /></a>
        </h3>
        <p className='flex'>
            {`${task.date} at ${task.time}`} 
            <FaTimes
              style={{color: 'tomato', cursor: 'pointer', marginTop: '10px', fontSize:'15px' }}
              onClick={() => onDelete(task.id)} 
            />
        </p>
    </div>
    </div>
    
  )
}

export default Event