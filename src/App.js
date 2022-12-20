import './App.css';
import { getTODO, postTODO, updateTODO, deleteTODO } from './component/fetch';
import {useQuery,useQueryClient, QueryClient, QueryClientProvider, useMutation } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools';
import { useState} from 'react'



function Todos() {
  // Set todo's state

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

  
  function Editable({...props}){
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
        
        <ul>
         {data.data.map((todo, idx) => (
            <Editable key={todo[0]}
                      todoID={todo[0]}
                      todoINDEX={idx}
                      value={todo[2]} 
                      handleDoubleClick={() => setToggled(idx)}
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
                      handleDelete={handleDelete}

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

const queryClient = new QueryClient();

function App() {
  return (
    
    <QueryClientProvider client={queryClient}>
      <Todos />
      <ReactQueryDevtools />
    </QueryClientProvider>
    
    
  );
}

export default App;
