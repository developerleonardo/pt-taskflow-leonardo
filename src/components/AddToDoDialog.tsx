"use client";

import { useState } from "react";
import { useToDoStore } from "@/stores/todo.store";
import { useTodos } from "@/hooks/useTodos";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

export const AddToDoDialog = () => {
  const isEditDialogOpen = useToDoStore((state) => state.isEditDialogOpen);
  const setIsEditDialogOpen = useToDoStore(
    (state) => state.setIsEditDialogOpen,
  );
  const { addTodo } = useTodos();

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error) setError(null);
  };

  const handleSave = async () => {
    if (!inputValue.trim()) {
      setError("Description is required");
      return;
    }
    setIsSubmitting(true);
    const result = await addTodo(inputValue.trim());
    setIsSubmitting(false);

    if (result.success) {
      toast.success("To-Do added successfully");
      setInputValue("");
      setIsEditDialogOpen(false);
    } else {
      // API errors surface here — the store also holds the error for the retry banner
      toast.error(result.message ?? "Failed to add To-Do");
    }
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
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
