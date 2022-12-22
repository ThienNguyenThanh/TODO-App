

export function TodoItemWrapper({
  text,
  isDone,
  children,
}) {
  return (
    <div>
      <div className="my-2 flex flex-row items-center rounded-md border border-app-200 p-5">
        <p className="text-md font-base flex-1 text-app-600 antialiased">
          <span className={isDone ? "line-through" : ""}>{text}</span>
        </p>
        <div className="flex flex-row">{children}</div>
      </div>
    </div>
  );
}
