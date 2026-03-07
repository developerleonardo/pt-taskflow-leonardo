import { describe, it, expect, beforeEach } from "vitest";
import { useToDoStore } from "@/stores/todo.store";
import { itemsMocks } from "@/mocks/tasks.mocks";

// Reset the store state before each test to ensure test isolation
beforeEach(() => {
  useToDoStore.setState({
    todos: [],
    localIds: new Set(),
    loading: false,
    error: null,
    currentPage: 0,
    total: 0,
  });
});

describe("useToDoStore — CRUD local", () => {
  it("setTodos reemplaza el listado completo", () => {
    useToDoStore.getState().setTodos(itemsMocks);
    expect(useToDoStore.getState().todos).toHaveLength(itemsMocks.length);
  });

  it("addTodoLocal agrega la tarea al inicio del listado y registra su ID como local", () => {
    useToDoStore.getState().setTodos(itemsMocks);
    const newTodo = { id: 99, todo: "New task", completed: false, userid: 1 };

    useToDoStore.getState().addTodoLocal(newTodo);

    const { todos, localIds } = useToDoStore.getState();
    expect(todos[0]).toEqual(newTodo);
    expect(localIds.has(99)).toBe(true);
  });

  it("updateTodoLocal cambia el estado completed de la tarea correcta", () => {
    useToDoStore.getState().setTodos(itemsMocks);

    useToDoStore.getState().updateTodoLocal(2, true);

    const updated = useToDoStore.getState().todos.find((t) => t.id === 2);
    expect(updated?.completed).toBe(true);
  });

  it("updateTodoLocal no modifica otras tareas", () => {
    useToDoStore.getState().setTodos(itemsMocks);
    useToDoStore.getState().updateTodoLocal(2, true);

    const others = useToDoStore
      .getState()
      .todos.filter((t) => t.id !== 2)
      .map((t) => t.completed);

    const original = itemsMocks
      .filter((t) => t.id !== 2)
      .map((t) => t.completed);

    expect(others).toEqual(original);
  });

  it("deleteTodoLocal elimina la tarea y limpia su ID de localIds", () => {
    const todo = { id: 99, todo: "To delete", completed: false, userid: 1 };
    useToDoStore.getState().addTodoLocal(todo);
    expect(useToDoStore.getState().localIds.has(99)).toBe(true);

    useToDoStore.getState().deleteTodoLocal(99);

    const { todos, localIds } = useToDoStore.getState();
    expect(todos.find((t) => t.id === 99)).toBeUndefined();
    expect(localIds.has(99)).toBe(false);
  });
});

describe("useToDoStore — estado de UI", () => {
  it("setLoading actualiza loading", () => {
    useToDoStore.getState().setLoading(true);
    expect(useToDoStore.getState().loading).toBe(true);
  });

  it("setError actualiza error", () => {
    useToDoStore.getState().setError("Something went wrong");
    expect(useToDoStore.getState().error).toBe("Something went wrong");
  });

  it("setSearchToDo actualiza searchToDo", () => {
    useToDoStore.getState().setSearchToDo("deploy");
    expect(useToDoStore.getState().searchToDo).toBe("deploy");
  });
});
