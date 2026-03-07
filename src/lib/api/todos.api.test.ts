import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "@/lib/api/todos.api";
import { itemsMocks } from "@/mocks/tasks.mocks";

// Intercept all fetch calls globally — avoids real network requests in tests
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// Helper to simulate a fetch Response with controlled data and ok status
const mockResponse = (data: unknown, ok = true) =>
  Promise.resolve({
    ok,
    json: () => Promise.resolve(data),
  } as Response);

beforeEach(() => {
  mockFetch.mockReset();
});

describe("getTodos", () => {
  it("retorna todos y total correctamente", async () => {
    mockFetch.mockReturnValueOnce(
      mockResponse({ todos: itemsMocks, total: 150 }),
    );

    const result = await getTodos(10, 0);

    expect(result.todos).toHaveLength(itemsMocks.length);
    expect(result.total).toBe(150);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/todos?limit=10&skip=0"),
    );
  });

  it("lanza un error si la respuesta no es ok", async () => {
    mockFetch.mockReturnValueOnce(mockResponse({}, false));
    await expect(getTodos(10, 0)).rejects.toThrow("Failed to fetch todos");
  });
});

describe("createTodo", () => {
  it("llama al endpoint correcto y retorna la tarea creada", async () => {
    const created = { id: 255, todo: "New task", completed: false, userId: 1 };
    mockFetch.mockReturnValueOnce(mockResponse(created));

    const result = await createTodo("New task");

    expect(result).toEqual(created);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/todos/add"),
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("lanza un error si la respuesta no es ok", async () => {
    mockFetch.mockReturnValueOnce(mockResponse({}, false));
    await expect(createTodo("New task")).rejects.toThrow(
      "Failed to create todo",
    );
  });
});

describe("updateTodo", () => {
  it("llama al endpoint correcto con el método PATCH", async () => {
    mockFetch.mockReturnValueOnce(
      mockResponse({ ...itemsMocks[1], completed: true }),
    );

    await updateTodo(2, true);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/todos/2"),
      expect.objectContaining({ method: "PATCH" }),
    );
  });

  it("lanza un error si la respuesta no es ok", async () => {
    mockFetch.mockReturnValueOnce(mockResponse({}, false));
    await expect(updateTodo(2, true)).rejects.toThrow("Failed to update todo");
  });
});

describe("deleteTodo", () => {
  it("llama al endpoint correcto con el método DELETE", async () => {
    mockFetch.mockReturnValueOnce(mockResponse({ id: 1, isDeleted: true }));

    await deleteTodo(1);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/todos/1"),
      expect.objectContaining({ method: "DELETE" }),
    );
  });

  it("lanza un error si la respuesta no es ok", async () => {
    mockFetch.mockReturnValueOnce(mockResponse({}, false));
    await expect(deleteTodo(1)).rejects.toThrow("Failed to delete todo");
  });
});
