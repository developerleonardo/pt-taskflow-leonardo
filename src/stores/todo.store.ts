import { create } from "zustand";
import { ToDoTypes } from "@/types";

interface TodoStore {
  todos: ToDoTypes[];
  loading: boolean;
  error: string | null;
  searchToDo: string;
  isEditDialogOpen: boolean;
  localIds: Set<number>;
  currentPage: number;
  total: number;
  hasFetched: boolean;
  setTodos: (todos: ToDoTypes[]) => void;
  addTodoLocal: (todo: ToDoTypes) => void;
  updateTodoLocal: (id: number, completed: boolean) => void;
  deleteTodoLocal: (id: number) => void;
  setCurrentPage: (page: number) => void;
  setTotal: (total: number) => void;

  setLoading: (loading: boolean) => void;
  setHasFetched: (hasFetched: boolean) => void;
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
  localIds: new Set<number>(),
  currentPage: 0,
  total: 0,
  hasFetched: false,

  setCurrentPage: (page) => set({ currentPage: page }),
  setTotal: (total) => set({ total }),

  setTodos: (todos) => set({ todos }),

  addTodoLocal: (todo) =>
    set((state) => ({
      todos: [todo, ...state.todos],
      localIds: new Set([...state.localIds, todo.id]),
    })),

  updateTodoLocal: (id, completed) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo,
      ),
    })),

  deleteTodoLocal: (id) =>
    set((state) => {
      const localIds = new Set(state.localIds);
      localIds.delete(id);
      return {
        todos: state.todos.filter((todo) => todo.id !== id),
        localIds,
      };
    }),

  setLoading: (loading) => set({ loading }),
  setHasFetched: (hasFetched) => set({ hasFetched }),
  setError: (error) => set({ error }),

  setSearchToDo: (search) => set({ searchToDo: search }),
  setIsEditDialogOpen: (isOpen) => set({ isEditDialogOpen: isOpen }),
}));
