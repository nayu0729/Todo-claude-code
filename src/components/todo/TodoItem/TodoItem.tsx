import React, { useState, useEffect, useRef } from 'react';
import { Todo } from '../../../types/todo';
import { Button, Checkbox, Input } from '../../common';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== todo.text) {
      onEdit(todo.id, trimmedText);
    }
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`fade-in flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all ${todo.completed ? 'opacity-75' : ''}`}>
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`${todo.completed ? '完了済み' : '未完了'}: ${todo.text}`}
      />
      
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <Input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="w-full"
          />
        ) : (
          <span 
            className={`block cursor-pointer text-gray-800 ${todo.completed ? 'line-through text-gray-500' : ''}`}
            onDoubleClick={handleEdit}
            title="ダブルクリックで編集"
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {!isEditing && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              aria-label="編集"
            >
              編集
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(todo.id)}
              aria-label="削除"
            >
              削除
            </Button>
          </>
        )}
      </div>
    </div>
  );
};