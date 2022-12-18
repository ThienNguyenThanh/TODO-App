import './App.css';
import { getTODO, postTODO } from './component/fetch';
import {useQuery,useQueryClient, QueryClient, QueryClientProvider, useMutation } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'



function Todos() {
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const {isLoading, error, data} = useQuery('todos', getTODO)
  // Mutations
  const mutation = useMutation(title => postTODO(title), {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('todos')
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const todo = event.target.newTODO.value;
    mutation.mutate(todo)
    console.log(todo);
  }

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  
  return (
    <div>
        
        <ul>
         {data.data.map((todo, idx) => (
           <li key={idx}>{todo}</li>
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
