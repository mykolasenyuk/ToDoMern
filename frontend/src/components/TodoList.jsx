import TodoListItem from "./TodoListItem.jsx";

export default function TodoList({ todos, openModal, onDelete, onComplete }) {
  return (
    <>
      <ul className={"w-full px-12 grid grid-cols-2 gap-4"}>
        {todos.map((todo) => (
          <TodoListItem
            todo={todo}
            key={todo._id}
            openModal={openModal}
            onDelete={onDelete}
            onComplete={onComplete}
          />
        ))}
      </ul>
    </>
  );
}
