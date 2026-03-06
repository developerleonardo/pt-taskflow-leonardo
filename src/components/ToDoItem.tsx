"use client";

import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { AlertDeleteTaskDialog } from "./AlertDeleteTaskDialog";
import { useTodos } from "@/hooks/useTodos";
import { toast } from "sonner";

type ToDoItemProps = {
  id: number;
  todo: string;
  completed: boolean;
  userid: number;
  onToggle: () => void;
};

export const ToDoItem = ({
  id,
  todo,
  completed,
  userid,
  onToggle,
}: ToDoItemProps) => {
  const { removeTodo } = useTodos();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onConfirm = async () => {
    await removeTodo(id);
    setIsDialogOpen(false);
    toast.success("To-Do deleted successfully");
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-1 bg-white rounded-md">
        <div className="flex gap-4 justify-center items-center">
          <Checkbox checked={completed} onCheckedChange={onToggle} />
          <span className="text-sm">{todo}</span>
        </div>
        <div className="flex gap-5 justify-center items-center">
          <span className="text-sm text-muted-foreground">{userid}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
      <AlertDeleteTaskDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        onConfirm={onConfirm}
      />
    </>
  );
};
