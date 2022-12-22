import { TodoItem } from "./TodoItem";
import { Message } from "./UI/Message";
import { useState} from 'react'
import { getTODO, postTODO, updateTODO, deleteTODO } from './fetch';
import {useQuery,useQueryClient, useMutation } from 'react-query';
import { SmallButton } from "./UI/SmallButton";

export function TodosList() {
  const todos = ['example1','example3','example3'];
  // const toggled = useRef()
  const [toggled, setToggled] = useState(-1)
  
  
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const {isLoading, error, data} = useQuery('todos', getTODO)

  // Mutations
  const addMutation = useMutation(title => postTODO(title), {
    onSuccess: () => {
      // Invalidate and refetch
      console.log(queryClient.getQueryData(['todos']))
      // queryClient.invalidateQueries('todos')
    },
  })

  const updateMutation = useMutation(({id, title, isDone}) => updateTODO(id, title,isDone), {
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
    event.currentTarget.disabled = true;
    const id = event.target.id;
    deleteMutation.mutate(id);
  }  

  function TodoItem({...props}){
    return(
      (props.todoINDEX === toggled) ? (
        <div className="my-2 flex flex-row items-center rounded-md border border-app-200 p-5">
            <input type="text" defaultValue={props.value} onBlur={props.handleBlur} />
        </div>
      ) : (

          <div className="my-2 flex flex-row items-center rounded-md border border-app-200 p-5">
            <p className="text-md font-base flex-1 text-app-600 antialiased"
               onDoubleClick={props.handleDoubleClick}
            >
              <span className={props.isDone ? "line-through" : ""}>{props.value}</span>
            </p>
            {/* <div className="flex flex-row">Hi</div> */}
            <SmallButton
              icon='done'
              alt="Mark task as done icon"
              onClick={() => updateMutation.mutate({id: props.todoID, isDone: true})}
            />
            <SmallButton
              id={props.todoID}
              icon='delete'
              alt="Remove task from list icon"
              onClick={props.handleDelete}
            />
          </div>
          

       
      )
    )
  }

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  return (
    <>
      {data.data.length > 0 ? (
        data.data.map((todo,idx) => <TodoItem key={todo[0]}
                                    todoID={todo[0]}
                                    todoINDEX={idx}
                                    value={todo[2]} 
                                    isDone={todo[3]}
                                    handleDoubleClick={() => setToggled(idx)}
                                    handleDelete={handleDelete}
                                    handleBlur={(e)=> {
                                          e.preventDefault();
                                          const newTitle = e.target.value;
                                          
                                          if(newTitle !== todo[2]){
                                            updateMutation.mutate({id: todo[0], title: newTitle});
                                            setToggled(-1);
                                          }else{
                                            setToggled(-1);
                                          }
                                    }}
                          />)
      ) : (
        <Message text="You don't have any tasks anymore :(" />
      )}
    </>
  );
}
