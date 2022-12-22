// import { useStore } from "../store";
import { Header } from "./UI/Header";
import { Input } from "./UI/Input";
import { Button } from "./UI/Button";
import { postTODO } from "./fetch";
import {useQuery,useQueryClient, useMutation } from 'react-query';

export function NewTodoControls() {
  const inputValue = 'Default'
  // const addNewTodo = useStore((state) => state.addNewTodo);
  // const setInputValue = useStore((state) => state.setInputValue);

  // Access the client
  const queryClient = useQueryClient()

  // Mutations
  const addMutation = useMutation(title => postTODO(title), {
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
  return (
    <>
    <form className="flex flex-col gap-2 sm:flex-row" onSubmit={handleAdd}>
      
      <Input/>
      <Button children="Add new task"  />
    </form>
    <hr className="my-12" />
      
    </>
  );
}
