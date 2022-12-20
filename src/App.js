import './App.css';
import { getTODO, postTODO, deleteTODO } from './component/fetch';
import {useQuery,useQueryClient, QueryClient, QueryClientProvider, useMutation } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'



function Todos() {
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

  const deleteMutation = useMutation(id => deleteTODO(id), {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('todos')
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const todo = event.target.newTODO.value;
    addMutation.mutate(todo)
    console.log(todo);
  }

  const handleDelete = (event) => {
    event.preventDefault();
    const id = event.target.id;
    deleteMutation.mutateAsync(id);
  }

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  return (
    <div>
        
        <ul>
         {data.data.map(todo => (
           <li key={todo[0]}>{todo[2]} <button id={todo[0]} onClick={handleDelete}>Delete</button></li>
           
         ))}
       </ul>
      
       <form onSubmit={handleSubmit}>
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
