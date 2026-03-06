import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useToDoStore } from "@/stores/todo.store";
import { AlertDeleteTaskDialog } from "./AlertDeleteTaskDialog";
import { useState } from "react";

interface ToDoItemProps {
  id: number | string;
  todo: string;
  completed: boolean;
  userid: number | string;
  onToggle: (id: number | string) => void;
}

export const ToDoItem = ({
  id,
  todo,
  completed,
  userid,
  onToggle,
}: ToDoItemProps) => {
  const deleteToDo = useToDoStore((state) => state.deleteToDo);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const onConfirm = () => {
    deleteToDo(id);
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-1 bg-white rounded-md">
        <div className="flex gap-4 justify-center items-center">
          <Checkbox checked={completed} onCheckedChange={() => onToggle(id)} />
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
