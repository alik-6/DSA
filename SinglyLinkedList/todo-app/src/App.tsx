import AddTodoInput from "./components/AddTodoInput";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="bg-inherit h-dvh flex justify-center">
      <div className="flex w-full justify-center flex-col">
        <div className="w-full flex justify-center">
          <div className="w-1/2 max-lg:w-10/12">
            <h1 className="text-5xl font-bold pb-12 flex justify-center">
              Todo App
            </h1>
            <AddTodoInput />
            <TodoList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
