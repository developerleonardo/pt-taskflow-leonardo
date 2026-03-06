"use client";
import { ToDoItem } from "@/components/ToDoItem";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useToDoStore } from "@/stores/todo.store";

export const CheckboxInTable = () => {
  const todos = useToDoStore((state) => state.todos);
  const setTodos = useToDoStore((state) => state.setTodos);
  const addToDo = useToDoStore((state) => state.addToDo);
  const setIsOpen = useToDoStore((state) => state.setIsEditDialogOpen);

  const toggleToDo = (id: number | string) => {
    const updatedTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodos(updatedTodos);
  };

  const completedTasks = todos.filter((item) => item.completed === true);
  const pendingTasks = todos.filter((item) => item.completed === false);
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col">
        <h2 className="self-start bg-red-100 rounded-lg px-2 py-1 mb-4 text-lg font-medium">
          To Do
        </h2>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between pl-10 pr-12 py-1 border-b border-b-neutral-300">
            <span className="text-sm text-muted-foreground">Description</span>
            <span className="text-sm text-muted-foreground">User ID</span>
          </div>
          {pendingTasks.map((item) => (
            <ToDoItem
              key={item.id}
              id={item.id}
              todo={item.todo}
              completed={item.completed}
              userid={item.userid}
              onToggle={toggleToDo}
            />
          ))}
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
      <section>
        <h2 className="inline-block bg-green-100 rounded-lg px-2 py-1 mb-4 text-lg font-medium">
          Completed
        </h2>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between pl-10 pr-12 py-1 border-b border-b-neutral-300">
            <span className="text-sm text-muted-foreground">Description</span>
            <span className="text-sm text-muted-foreground">User ID</span>
          </div>
          {completedTasks.map((item) => (
            <ToDoItem
              key={item.id}
              id={item.id}
              todo={item.todo}
              completed={item.completed}
              userid={item.userid}
              onToggle={toggleToDo}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
