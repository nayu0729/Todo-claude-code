import { useState, useEffect, useMemo, useCallback } from 'react';
import { Todo, FilterType, UseTodosReturn } from '../types/todo';
import { storageService, createTodo, updateTodo } from '../utils/storage';

export function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  // 初期データの読み込み
  useEffect(() => {
    const loadedTodos = storageService.loadTodos();
    setTodos(loadedTodos);
  }, []);

  // todosが変更されるたびにローカルストレージに保存
  useEffect(() => {
    if (todos.length >= 0) {
      storageService.saveTodos(todos);
    }
  }, [todos]);

  // フィルタリングされたTodoリスト
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // アクティブなTodo数
  const activeCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  // 完了したTodo数
  const completedCount = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  // Todo追加
  const addTodo = useCallback((text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const newTodo = createTodo(trimmedText);
    setTodos(prev => [...prev, newTodo]);
  }, []);

  // Todo完了状態切り替え
  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? updateTodo(todo, { completed: !todo.completed })
          : todo
      )
    );
  }, []);

  // Todo編集
  const editTodo = useCallback((id: string, text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? updateTodo(todo, { text: trimmedText })
          : todo
      )
    );
  }, []);

  // Todo削除
  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  // 完了済みTodoを一括削除
  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  return {
    todos,
    filteredTodos,
    filter,
    activeCount,
    completedCount,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    setFilter,
    clearCompleted,
  };
}