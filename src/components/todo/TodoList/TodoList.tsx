import React from 'react';
import { Todo } from '../../../types/todo';
import { TodoItem } from '../TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onEditTodo: (id: string, text: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onToggleTodo, 
  onEditTodo, 
  onDeleteTodo 
}) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">
          タスクがありません
        </div>
        <div className="text-gray-400 text-sm mt-2">
          上のフォームから新しいタスクを追加しましょう
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onEdit={onEditTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </div>
  );
};