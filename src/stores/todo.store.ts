import { create } from "zustand";
import { ToDoTypes } from "../types";

interface todoStore {
  todos: ToDoTypes[];
  setTodos: (todos: ToDoTypes[]) => void;
  addToDo: (todo: ToDoTypes) => void;
  deleteToDo: (id: string | number) => void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  searchToDo: string;
  setSearchToDo: (search: string) => void;
}

export const useToDoStore = create<todoStore>()((set) => ({
  todos: [
    {
      id: "1",
      todo: "Prototype app",
      completed: true,
      userid: "26",
    },
    {
      id: "2",
      todo: "Implement user authentication",
      completed: false,
      userid: "42",
    },
    {
      id: "3",
      todo: "Design database schema",
      completed: true,
      userid: "17",
    },
    {
      id: "4",
      todo: "Set up project repository",
      completed: true,
      userid: "8",
    },
    {
      id: "5",
      todo: "Create API endpoints",
      completed: false,
      userid: "13",
    },
    {
      id: "6",
      todo: "Build UI components",
      completed: false,
      userid: "34",
    },
  ],
  setTodos: (todos: ToDoTypes[]) =>
    set(() => ({
      todos,
    })),
  searchToDo: "",
  setSearchToDo: (search: string) =>
    set(() => ({
      searchToDo: search,
    })),
  addToDo: (todo: ToDoTypes) =>
    set((state) => ({
      todos: [...state.todos, todo],
    })),
  deleteToDo: (id: number | string) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  isEditDialogOpen: false,
  setIsEditDialogOpen: (isOpen: boolean) =>
    set(() => ({
      isEditDialogOpen: isOpen,
    })),
}));
