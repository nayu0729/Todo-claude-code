import { Header, TodoList, FilterBar, Footer } from './components/todo';
import { useTodos } from './hooks/useTodos';
import './styles/globals.css';

function App() {
  const {
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
  } = useTodos();

  const totalCount = filteredTodos.length;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <Header onAddTodo={addTodo} />
          
          <FilterBar
            currentFilter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
          />
          
          <TodoList
            todos={filteredTodos}
            onToggleTodo={toggleTodo}
            onEditTodo={editTodo}
            onDeleteTodo={deleteTodo}
          />
          
          <Footer
            completedCount={completedCount}
            totalCount={totalCount}
            onClearCompleted={clearCompleted}
          />
        </div>
      </div>
    </div>
  );
}

export default App;