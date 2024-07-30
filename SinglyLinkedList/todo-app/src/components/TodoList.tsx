import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoCard from "./TodoCard";

function TodoList() {
  const { state } = useContext(TodoContext);
  function getTodos() {
    let todoList = [];
    let todo = undefined;
    if (state.todos) todo = state.todos;

    while (todo?.title) {
      todoList.push(todo.title);
      todo = todo.next;
    }
    return todoList;
  }
  const todos = getTodos();
  return (
    <div className="overflow-auto flex gap-4 mt-4 pb-4 flex-col max-h-96">
      {todos.map((title, index) => (
        <TodoCard
          title={title}
          key={index}
          id={index}
          disableForward={index === 0}
          disableBackward={todos.length - 1 === index}
        />
      ))}
    </div>
  );
}

export default TodoList;
