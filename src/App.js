import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools';
import {TodoList} from './component/todoList'

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
