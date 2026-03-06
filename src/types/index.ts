export interface ToDoTypes {
  id: number;
  todo: string;
  completed: boolean;
  userid: number;
}

export interface TodosResponse {
  todos: ToDoTypes[];
  total: number;
  skip: number;
  limit: number;
}
