import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export const LoadingSkeleton = () => {
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
            <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-full animate-pulse rounded-md bg-neutral-100"
                />
              ))}
            </div>
          </div>
        </div>
        <Button className="mt-4 place-self-end" size="sm">
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
            <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-full animate-pulse rounded-md bg-neutral-100"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
