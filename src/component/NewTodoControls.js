import { Input } from "./UI/Input";
import { Button } from "./UI/Button";
import { postTODO } from "./fetch";
import {useQueryClient, useMutation } from 'react-query';

export function NewTodoControls() {
  // Access the client
  const queryClient = useQueryClient()

  // Mutations
  const { isLoading,mutate} = useMutation(title => postTODO(title), {
    onSuccess: (data) => {
      // Use response data
      queryClient.setQueryData(['todos'], (oldTODO) =>  {
        const newData = [data.ref['@ref'].id ,data.ts,data.data.title, data.data.isDone]
        return{
          data: [...oldTODO.data, newData]
        }
      })
    },
  })

  const handleAdd = (event) => {
    event.preventDefault();
    const todo = event.target.newTODO.value;
    mutate(todo)
  }
  return (
    <>
    <form className="flex flex-col gap-2 sm:flex-row" onSubmit={handleAdd}>
      
      <Input/>
      <Button children="Add new task"  />
    </form>
    <br></br>
    {isLoading && <h1>Adding new todo ....</h1>}
    <hr className="my-12" />
    </>
  );
}
