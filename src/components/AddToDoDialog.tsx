"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToDoStore } from "@/stores/todo.store";
import { useState } from "react";

export const AddToDoDialog = () => {
  const isEditDialogOpen = useToDoStore((state) => state.isEditDialogOpen);
  const setIsEditDialogOpen = useToDoStore(
    (state) => state.setIsEditDialogOpen,
  );
  const addTodoLocal = useToDoStore((state) => state.addTodoLocal);

  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  if (inputValue.length > 30) {
    setError("Description must be less than 30 characters");
    return;
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(null);
  };

  const createToDo = (description: string) => {
    if (!description.trim()) return;
    const newToDo = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      todo: description,
      completed: false,
      userid: Date.now(),
    };
    addTodoLocal(newToDo);
    setInputValue("");
    setIsEditDialogOpen(false);
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add To-Do</DialogTitle>
          <DialogDescription>
            Enter the details for your new to-do item.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="description" className="sr-only">
              Description
            </Label>
            <Input
              id="description"
              value={inputValue}
              onChange={handleOnChange}
              maxLength={30}
            />
            <span className="text-xs text-muted-foreground">
              {inputValue.length}/30 characters
            </span>
            {error && <span className="text-sm text-red-500">{error}</span>}
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" onClick={() => createToDo(inputValue)}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
