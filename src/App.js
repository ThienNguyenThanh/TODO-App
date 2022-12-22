import { QueryClient, QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools';
import {TodoList} from './component/todoList'
import { Title } from './component/UI/Title';
import { NewTodoControls } from './component/NewTodoControls';
import { TodosList } from './component/TodosList';

const queryClient = new QueryClient();
function App() {
  return (
    
    <QueryClientProvider client={queryClient}>
        <div className="mx-auto mt-16 mb-12 max-w-2xl p-6 sm:mt-24">
          <Title
            title="What do you have to do today?"
            subtitle="@ThienNguyenThanh/TODO-App"
          />
          <NewTodoControls />
          <TodosList />
        </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
      
    
    
  );
}

export default App;
