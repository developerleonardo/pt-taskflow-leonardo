const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTodos(limit = 10, skip = 0) {
  const res = await fetch(`${BASE_URL}/todos?limit=${limit}&skip=${skip}`);

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return res.json();
}

export async function createTodo(todo: string) {
  const res = await fetch(`${BASE_URL}/todos/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todo,
      completed: false,
      userId: 1,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create todo");
  }

  return res.json();
}

export async function updateTodo(id: number, completed: boolean) {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to update todo");
  }

  return res.json();
}

export async function deleteTodo(id: number) {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }

  return res.json();
}
