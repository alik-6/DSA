import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useContext,
  useState,
} from "react";
import { TodoContext } from "../context/TodoContext";
import { BsArrowDownUp } from "react-icons/bs";

function AddTodoInput() {
  const [inputValue, setInputValue] = useState("");
  const { dispatch, state } = useContext(TodoContext);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }
  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      dispatch({
        type: "add-todo",
        title: inputValue,
      });
      setInputValue("");
    }
  }
  function handleButtonClick(_: MouseEvent<HTMLButtonElement>) {
    dispatch({
      type: "reverse-todo",
    });
  }
  function shouldShowReverseButton() {
    if (state.todos && state.todos.next) {
      return true;
    }
    return false;
  }
  const showReverseButton = shouldShowReverseButton();
  return (
    <div className="w-full flex justify-between bg-gray-950 border-gray-700 focus:outline-none text-lg border-2 p-3 rounded">
      <input
        title="Name of the todo(Enter to add)"
        type="text"
        name="title"
        id="title"
        value={inputValue}
        className="w-fit bg-transparent flex-grow focus:outline-none text-lg"
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <button
        title={`Reverse the order of todo Items${
          !showReverseButton ? "(disabled)" : ""
        }`}
        className={`${showReverseButton ? "" : "text-gray-500"}
 focus:outline-none`}
        disabled={!showReverseButton}
        onClick={handleButtonClick}
      >
        <BsArrowDownUp />
      </button>
    </div>
  );
}

export default AddTodoInput;
