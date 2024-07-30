import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { FiArrowDown, FiArrowUp, FiCheck } from "react-icons/fi";

function TodoCard(props: {
  title: string;
  id: number;
  disableForward: boolean;
  disableBackward: boolean;
}) {
  const { dispatch } = useContext(TodoContext);

  return (
    <div className="w-full bg-gray-900 shadow shadow-gray-500 focus:outline-none text-lg p-3 rounded flex justify-between">
      <p>{props.title}</p>
      <div className="flex gap-2">
        <button
          title={`move todo up ${props.disableForward ? "(disabled)" : ""}`}
          disabled={props.disableForward}
          className={props.disableForward ? "text-gray-500" : ""}
          onClick={(event) => {
            event.preventDefault();
            dispatch({
              type: "move-todo",
              direction: "up",
              id: props.id,
            });
          }}
        >
          <FiArrowUp />
        </button>
        <button
          title={`move todo down ${props.disableBackward ? "(disabled)" : ""}`}
          disabled={props.disableBackward}
          className={props.disableBackward ? "text-gray-500" : ""}
          onClick={(event) => {
            event.preventDefault();
            dispatch({
              type: "move-todo",
              direction: "down",
              id: props.id,
            });
          }}
        >
          <FiArrowDown />
        </button>
        <button
          title="remove todo"
          onClick={(event) => {
            event.preventDefault();
            dispatch({
              type: "remove-todo",
              id: props.id,
            });
          }}
        >
          <FiCheck />
        </button>
      </div>
    </div>
  );
}

export default TodoCard;
