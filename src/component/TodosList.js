import { Message } from "./UI/Message";
import { useState} from 'react'
import { getTODO, updateTODO, deleteTODO } from './fetch';
import {useQuery,useQueryClient, useMutation } from 'react-query';
import { SmallButton } from "./UI/SmallButton";

export function TodosList() {
  // const toggled = useRef()
  const [toggled, setToggled] = useState(-1)

  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const {isLoading, error, data, isFetching} = useQuery('todos', getTODO)

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


  const handleDelete = (event) => {
    event.preventDefault();
    event.currentTarget.disabled = true;
    const id = event.target.id;
    deleteMutation.mutate(id);
  }  

  function TodoItem({...props}){

    // Updating todo
    const handleBlur = (e) => {
        e.preventDefault();
        const newTitle = e.target.value;
        
        if(newTitle !== props.value){
          updateMutation.mutate({id: props.todoID, title: newTitle});
          setToggled(-1);
        }else{
          setToggled(-1);
        }
    }
  
    return(
      (props.todoINDEX === toggled) ? (
        <div className="my-2 flex flex-row items-center rounded-md border border-app-200 p-5">
            <input type="text" defaultValue={props.value} onBlur={handleBlur} autoFocus/>
        </div>
      ) : (
  
          <div className="my-2 flex flex-row items-center rounded-md border border-app-200 p-5">
            <p className="text-md font-base flex-1 text-app-600 antialiased"
               onDoubleClick={() => setToggled(props.todoINDEX)}
            >
              <span>{props.value}</span>
            </p>
            <SmallButton
              id={props.todoID}
              icon='done'
              alt="Mark task as done icon"
              onClick={handleDelete}
            />
          </div>
      )
    )
  }

  if (isLoading) return 'Loading...'
  if (isFetching || updateMutation.isLoading || deleteMutation.isLoading) return 'Updating...'
  if (error) return 'An error has occurred: ' + error.message
  
  return (
    <>
      {data.data.length > 0 ? (
        data.data.map((todo,idx) => <TodoItem key={todo[0]}
                                    todoID={todo[0]}
                                    todoINDEX={idx}
                                    value={todo[2]} 
                                    isDone={todo[3]}
                          />)
      ) : (
        <Message text="You don't have any tasks anymore :(" />
      )}
    </>
  );
}
