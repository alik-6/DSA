import { createContext, useReducer } from "react";

class TodoNode {
  constructor(
    public title: string,
    public next: TodoNode | undefined = undefined
  ) {}
}
class TodoList {
  constructor(public head: TodoNode | undefined = undefined) {}
  reverseTodo() {
    let current = this.head;
    let prev: TodoNode | undefined = undefined;
    let next: TodoNode | undefined = undefined;

    while (current) {
      next = current.next;
      current.next = prev;

      prev = current;
      current = next;
    }

    this.head = prev;
    console.log(this.head);
  }
  moveTodo(fromIndex: number, toIndex: number) {
    if (fromIndex < 0 || toIndex < 0) return;
    if (fromIndex === toIndex) return;

    let fromNode = this.getNodeAt(fromIndex);
    if (!fromNode) return;

    this.removeTodo(fromIndex);

    if (toIndex === 0) {
      fromNode.next = this.head;
      this.head = fromNode;
    } else {
      let current = this.head;
      let count = 0;
      while (current && count < toIndex - 1) {
        current = current.next;
        count++;
      }
      if (current) {
        fromNode.next = current.next;
        current.next = fromNode;
      }
    }
  }

  getNodeAt(index: number): TodoNode | undefined {
    let current = this.head;
    let count = 0;
    while (current) {
      if (count === index) {
        return current;
      }
      current = current.next;
      count++;
    }
    return undefined;
  }

  addTodo(title: string) {
    const newTodo = new TodoNode(title);
    if (!this.head) {
      this.head = newTodo;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newTodo;
    }
  }

  removeTodo(index: number) {
    if (index === 0) {
      if (this.head) {
        this.head = this.head.next;
      }
    } else {
      let current = this.head;
      let count = 0;
      while (current && count < index - 1) {
        current = current.next;
        count++;
      }
      if (current && current.next) {
        current.next = current.next.next;
      }
    }
  }
}
const initialState = {
  todos: undefined,
};

type TodoActions =
  | { type: "add-todo"; title: string }
  | { type: "remove-todo"; id: number }
  | { type: "move-todo"; direction: "up" | "down"; id: number }
  | { type: "reverse-todo" };

type TodoState = {
  todos: TodoNode | undefined;
};
function todoReducer(state: TodoState = initialState, actions: TodoActions) {
  const previousState = state;
  const tl = new TodoList(previousState.todos);
  switch (actions.type) {
    case "add-todo": {
      tl.addTodo(actions.title);
      return { todos: tl.head };
    }
    case "remove-todo": {
      tl.removeTodo(actions.id);
      return { todos: tl.head };
    }
    case "move-todo": {
      switch (actions.direction) {
        case "up": {
          const tl = new TodoList(previousState.todos);
          tl.moveTodo(actions.id, actions.id - 1);
          return { todos: tl.head };
        }
        case "down":
          const tl = new TodoList(previousState.todos);

          tl.moveTodo(actions.id, actions.id + 1);
          return { todos: tl.head };
      }
    }
    case "reverse-todo": {
      tl.reverseTodo();
      return { todos: tl.head };
    }
    default:
      return previousState;
  }
}
const TodoContext = createContext<{
  state: TodoState;
  dispatch: any;
}>({
  state: initialState,
  dispatch: undefined,
});
function TodoProvider({ children }: { children: any }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoProvider, TodoContext };
