"use client";

import { ToDoItem } from "@/components/ToDoItem";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useToDoStore } from "@/stores/todo.store";
import { useTodos } from "@/hooks/useTodos";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { EmptyState } from "./EmptyState";

export const CheckboxInTable = () => {
  const setIsOpen = useToDoStore((state) => state.setIsEditDialogOpen);
  const searchToDo = useToDoStore((state) => state.searchToDo);
  const hasFetched = useToDoStore((state) => state.hasFetched);

  const { todos, toggleTodo, loading, error, fetchTodos } = useTodos();

  const filteredTodos = todos.filter((item) =>
    item.todo.toLowerCase().includes(searchToDo.toLowerCase()),
  );

  const pendingTasks = filteredTodos.filter((item) => !item.completed);
  const completedTasks = filteredTodos.filter((item) => item.completed);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-8">
        <p className="text-sm text-red-500">{error}</p>
        <Button variant="outline" size="sm" onClick={() => fetchTodos(0)}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      <section className="flex flex-col h-1/2 min-h-0">
        <h2 className="bg-red-100 rounded-lg px-2 py-1 mb-4 text-lg font-medium">
          To Do
        </h2>
        <div className="flex flex-col flex-1 min-h-0 gap-2">
          <div className="flex justify-between pl-10 pr-12 py-1 border-b border-neutral-300">
            <span className="text-sm text-muted-foreground">Description</span>
            <span className="text-sm text-muted-foreground">User ID</span>
          </div>
          <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
            {pendingTasks.length === 0 && hasFetched === true ? (
              <EmptyState />
            ) : (
              pendingTasks.map((item) => (
                <ToDoItem
                  key={item.id}
                  id={item.id}
                  todo={item.todo}
                  completed={item.completed}
                  userid={item.userid}
                  onToggle={() => toggleTodo(item.id, item.completed)}
                />
              ))
            )}
          </div>
        </div>
        <Button
          className="mt-4 place-self-end"
          size="sm"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </section>

      <section className="flex flex-col h-1/2 min-h-0">
        <h2 className="bg-green-100 rounded-lg px-2 py-1 mb-4 text-lg font-medium">
          Completed
        </h2>
        <div className="flex flex-col flex-1 min-h-0 gap-2">
          <div className="flex justify-between pl-10 pr-12 py-1 border-b border-b-neutral-300">
            <span className="text-sm text-muted-foreground">Description</span>
            <span className="text-sm text-muted-foreground">User ID</span>
          </div>
          <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
            {completedTasks.length === 0 && hasFetched === true ? (
              <EmptyState />
            ) : (
              completedTasks.map((item) => (
                <ToDoItem
                  key={item.id}
                  id={item.id}
                  todo={item.todo}
                  completed={item.completed}
                  userid={item.userid}
                  onToggle={() => toggleTodo(item.id, item.completed)}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};
