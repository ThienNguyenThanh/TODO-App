import { useState} from 'react'
import { getTODO, postTODO, updateTODO, deleteTODO } from './fetch';
import {useQuery,useQueryClient, useMutation } from 'react-query';


export function TodoList() {
    // Set todo's state
  
    // const toggled = useRef()
    const [toggled, setToggled] = useState(-1)
  
  
    // Access the client
    const queryClient = useQueryClient()
  
    // Queries
    const {isFetching, isLoading, error, data} = useQuery('todos', getTODO)
  
    // Mutations
    const addMutation = useMutation(title => postTODO(title), {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('todos')
      },
    })
  
    const updateMutation = useMutation(({index, title}) => updateTODO(index, title), {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('todos')
      },
    })
  
    const deleteMutation = useMutation(id => deleteTODO(id), {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('todos')
      },
    })
  
    const handleAdd = (event) => {
      event.preventDefault();
      const todo = event.target.newTODO.value;
      addMutation.mutate(todo)
    }
  
    const handleDelete = (event) => {
      event.preventDefault();
      const id = event.target.id;
      deleteMutation.mutate(id);
    }  

    function TodoItem({...props}){
      return(
        (props.todoINDEX === toggled) ? (
          <input type="text" defaultValue={props.value} onBlur={props.handleBlur}/>
        ) : (
          <div>
            <li onDoubleClick={props.handleDoubleClick}>{props.value} <button id={props.todoID} onClick={props.handleDelete}>Delete</button></li>
  
          </div>
         
        )
      )
    }
  
    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
    
    return (
      <div>
          <h1>TODO App</h1>
          <ul>
           {data.data.map((todo, idx) => (
              <TodoItem key={todo[0]}
                        todoID={todo[0]}
                        todoINDEX={idx}
                        value={todo[2]} 
                        handleDoubleClick={() => setToggled(idx)}
                        handleDelete={handleDelete}
                        handleBlur={(e)=> {
                              e.preventDefault();
                              const newTitle = e.target.value;
                              
                              if(newTitle !== todo[2]){
                                updateMutation.mutate({index: todo[0], title: newTitle});
                                setToggled(-1);
                              }else{
                                setToggled(-1);
                              }
                        }}
              />
           ))}
         </ul>
        
         <form onSubmit={handleAdd}>
          <input type='text' placeholder="Enter things to do." name='newTODO'/>
          <button>Add TODO</button>
          </form>
      </div>
    )
  }