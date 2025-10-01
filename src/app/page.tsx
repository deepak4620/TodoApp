"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./types/todo";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Input from "./components/Input";
import Button from "./components/Button";
import TodoList from "./components/TodoList";

export default function Home() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [task, setTask] = useState("");

  const addTodo = () => {
    if (!task.trim()) return;
    setTodos([...todos, { id: uuidv4(), text: task, done: false }]);
    setTask("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, text } : t))
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.done));
  };

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <main className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-br from-purple-200 via-pink-100 to-indigo-200">
      <h1 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">
        My Todo App
      </h1>

  
      <div className="flex mb-6 w-full max-w-md">
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task..."
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          className="shadow-lg"
        />
        <Button onClick={addTodo} className="ml-2 shadow-lg hover:scale-105 transition-transform">
          Add
        </Button>
      </div>

    
      <div className="flex justify-between w-full max-w-md mb-4 text-gray-700 font-medium">
        <span>{remaining} tasks left</span>
        <button
          onClick={clearCompleted}
          className="text-red-500 hover:text-red-700 transition-colors font-semibold cursor-pointer"
        >
          Clear Completed
        </button>
      </div>

    
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    </main>
  );
}
