import React, { useState } from 'react';

interface Todo {
  text: string;
  completed: boolean;
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue.trim(), completed: false }]);
      setInputValue('');
    }
  };

  const handleTodoDelete = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleTodoComplete = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'active') {
      return !todo.completed;
    } else if (filter === 'completed') {
      return todo.completed;
    }
  });

  return (
    <div className='extended-main-content'>
      <h1 className='extended-first-content'>Ramazan Azimli | To-Do App</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={inputValue} placeholder='Add Anything' onChange={handleInputChange} className='main-input' />
        <button type="submit" className='main-button'>Add</button>
      </form>
      <div className='radios'>
      <label>
  <input type="radio" name="filter" value="all" checked={filter === 'all'} onChange={handleFilterChange} style={{ display: 'none' }} />
  <span>All</span>
</label>
<label>
  <input type="radio" name="filter" value="active" checked={filter === 'active'} onChange={handleFilterChange} style={{ display: 'none' }} />
  <span>Active</span>
</label>
<label>
  <input type="radio" name="filter" value="completed" checked={filter === 'completed'} onChange={handleFilterChange} style={{ display: 'none' }} />
  <span>Completed</span>
</label>
      </div>
      <ul className='card-in'>
        {filteredTodos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => handleTodoComplete(index)}>{todo.text}</span>
            <button onClick={() => handleTodoDelete(index)} className='main-button-2'>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
