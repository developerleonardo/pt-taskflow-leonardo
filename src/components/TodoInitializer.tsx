"use client";

import { useEffect } from "react";
import { useTodos } from "@/hooks/useTodos";

export const TodoInitializer = () => {
  const { fetchTodos } = useTodos();

  useEffect(() => {
    fetchTodos(0);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};
