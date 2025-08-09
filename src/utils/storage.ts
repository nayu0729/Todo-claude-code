import { Todo } from '../types/todo';

const STORAGE_KEY = 'todoApp_todos';

export const storageService = {
  loadTodos(): Todo[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      return parsed.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
      }));
    } catch (error) {
      console.error('Failed to load todos from localStorage:', error);
      return [];
    }
  },

  saveTodos(todos: Todo[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error);
    }
  },

  clearTodos(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear todos from localStorage:', error);
    }
  }
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createTodo = (text: string): Todo => {
  const now = new Date();
  return {
    id: generateId(),
    text: text.trim(),
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
};

export const updateTodo = (todo: Todo, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>): Todo => {
  return {
    ...todo,
    ...updates,
    updatedAt: new Date(),
  };
};