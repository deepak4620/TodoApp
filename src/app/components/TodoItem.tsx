import React, { useState } from "react";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleEdit = () => {
    if (text.trim() === "") return;
    onEdit(text);
    setEditing(false);
  };

  return (
    <li
      className="flex items-center justify-between bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow transform hover:scale-[1.01]"
    >
      {editing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === "Enter" && handleEdit()}
          autoFocus
          className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      ) : (
        <span
          onClick={onToggle}
          className={`flex-1 cursor-pointer text-lg font-medium ${todo.done ? "line-through text-gray-400" : "text-gray-800"}`}
        >
          {todo.text}
        </span>
      )}

      <div className="flex gap-3 ml-4">
        <button
          onClick={() => setEditing(!editing)}
          className="text-yellow-500 hover:text-yellow-700 text-lg font-bold transition-colors"
        >
          ✎
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 text-lg font-bold transition-colors"
        >
          ✕
        </button>
      </div>
    </li>
  );
}
