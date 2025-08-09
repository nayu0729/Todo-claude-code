import React, { useState, FormEvent } from 'react';
import { Button, Input } from '../../common';

interface HeaderProps {
  onAddTodo: (text: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      onAddTodo(trimmedValue);
      setInputValue('');
    }
  };

  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Todo App</h1>
      <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
        <Input
          type="text"
          placeholder="新しいタスクを入力..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1"
        />
        <Button
          type="submit"
          variant="primary"
          disabled={!inputValue.trim()}
        >
          追加
        </Button>
      </form>
    </div>
  );
};