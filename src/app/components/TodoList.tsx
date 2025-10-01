import React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
}

export default function TodoList({ todos, toggleTodo, deleteTodo, editTodo }: TodoListProps) {
  return (
    <ul className="w-full max-w-md space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => toggleTodo(todo.id)}
          onDelete={() => deleteTodo(todo.id)}
          onEdit={(text) => editTodo(todo.id, text)}
        />
      ))}
    </ul>
  );
}
