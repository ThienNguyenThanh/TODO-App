// import { useStore } from "../store";
import { SmallButton } from "./UI/SmallButton";
import { TodoItemWrapper } from "./UI/TodoItemWrapper";


export function TodoItem({ id, text, isDone }) {
  // const removeSingleTodo = useStore((state) => state.removeSingleTodo);
  // const toggleSingleTodo = useStore((state) => state.toggleSingleTodo);

  return (
    <TodoItemWrapper text={text} isDone={isDone}>
      <SmallButton
        icon='done'
        alt="Mark task as done icon"
        onClick={() => console.log('Mark todo done')}
      />
      <SmallButton
        icon='delete'
        alt="Remove task from list icon"
        onClick={() => console.log('Remove todo')}
      />
    </TodoItemWrapper>
  );
}
