"use client";
import { ToDoItem } from "@/components/ToDoItem";
import { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { tableData } from "@/mocks/tasks.mocks";

export const CheckboxInTable = () => {
  const [todos, setTodos] = useState(tableData);

  const completedTasks = todos.filter((item) => item.completed === true);
  const pendingTasks = todos.filter((item) => item.completed === false);
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col">
        <h2 className="self-start bg-red-100 rounded-lg px-2 py-1 mb-4 text-lg font-semibold">
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
            />
          ))}
        </div>
        <Button className="mt-4 place-self-end" size="sm">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </section>
      <section>
        <h2 className="inline-block bg-green-100 rounded-lg px-2 py-1 mb-4 text-lg font-semibold">
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
            />
          ))}
        </div>
      </section>
    </div>
  );
};
