import { FolderClock } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="flex flex-col justify-center items-center flex-1 gap-2 min-h-0">
      <FolderClock />
      <p className="text-sm text-muted-foreground">No tasks found.</p>
      <p className="text-sm text-muted-foreground">
        Add a new task to see it here or go to the next page.
      </p>
    </div>
  );
};
