import { create } from "zustand";
import { ToDoTypes } from "@/types";

interface TodoStore {
  todos: ToDoTypes[];
  loading: boolean;
  error: string | null;
  searchToDo: string;
  isEditDialogOpen: boolean;

  setTodos: (todos: ToDoTypes[]) => void;
  addTodoLocal: (todo: ToDoTypes) => void;
  updateTodoLocal: (id: number, completed: boolean) => void;
  deleteTodoLocal: (id: number) => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  setSearchToDo: (search: string) => void;
  setIsEditDialogOpen: (isOpen: boolean) => void;
}

export const useToDoStore = create<TodoStore>((set) => ({
  todos: [],
  loading: false,
  error: null,
  searchToDo: "",
  isEditDialogOpen: false,

  setTodos: (todos) => set({ todos }),

  addTodoLocal: (todo) =>
    set((state) => ({
      todos: [todo, ...state.todos],
    })),

  updateTodoLocal: (id, completed) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo,
      ),
    })),

  deleteTodoLocal: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  setSearchToDo: (search) => set({ searchToDo: search }),
  setIsEditDialogOpen: (isOpen) => set({ isEditDialogOpen: isOpen }),
}));
