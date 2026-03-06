"use client";

import { useState, useCallback } from "react";
import { useToDoStore } from "@/stores/todo.store";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "@/lib/api/todos.api";
import type { ToDoTypes } from "@/types";

const LIMIT = 10;

export const useTodos = () => {
  const {
    todos,
    addTodoLocal,
    updateTodoLocal,
    deleteTodoLocal,
    setTodos,
    loading,
    setLoading,
    error,
    setError,
    currentPage,
    total,
    setCurrentPage,
    setTotal,
  } = useToDoStore();

  const fetchTodos = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);
      try {
        const skip = page * LIMIT;
        const data = await getTodos(LIMIT, skip);
        setTodos(data.todos);
        setTotal(data.total);
        setCurrentPage(page);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    },
    [setTodos, setLoading, setError],
  );

  const addTodo = useCallback(
    async (todoText: string) => {
      setError(null);
      try {
        const newTodo: ToDoTypes = await createTodo(todoText);
        addTodoLocal(newTodo);
        return { success: true };
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to create todo";
        setError(message);
        return { success: false, message };
      }
    },
    [addTodoLocal, setError],
  );

  const toggleTodo = useCallback(
    async (id: number, currentCompleted: boolean) => {
      const next = !currentCompleted;
      updateTodoLocal(id, next);

      const localIds = useToDoStore.getState().localIds;
      if (localIds.has(id)) return;

      try {
        await updateTodo(id, next);
      } catch (err) {
        updateTodoLocal(id, currentCompleted);
        setError(err instanceof Error ? err.message : "Failed to update todo");
      }
    },
    [updateTodoLocal, setError],
  );
  const removeTodo = useCallback(
    async (id: number) => {
      setError(null);

      const localIds = useToDoStore.getState().localIds;
      if (localIds.has(id)) {
        deleteTodoLocal(id);
        return { success: true };
      }

      try {
        await deleteTodo(id);
        deleteTodoLocal(id);
        return { success: true };
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to delete todo";
        setError(message);
        return { success: false, message };
      }
    },
    [deleteTodoLocal, setError],
  );

  const totalPages = Math.ceil(total / LIMIT);
  const hasPrev = currentPage > 0;
  const hasNext = currentPage < totalPages - 1;

  const goToPage = useCallback(
    (page: number) => {
      fetchTodos(page);
    },
    [fetchTodos],
  );

  return {
    todos,
    loading,
    error,
    currentPage,
    total,
    totalPages,
    hasPrev,
    hasNext,
    fetchTodos,
    addTodo,
    toggleTodo,
    removeTodo,
    goToPage,
  };
};
