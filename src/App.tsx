import React, { useEffect, useRef } from 'react';
import './styles/todoapp.scss';
import { useTodos } from '../src/components/TodoContext';
import cn from 'classnames';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { todos, dispatch } = useTodos();

  const mainInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!mainInputRef.current) {
      return;
    }

    const newTitle = mainInputRef.current.value.trim();

    if (newTitle.length > 0) {
      dispatch({ type: 'ADD', payload: newTitle });
      mainInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (mainInputRef.current) {
      mainInputRef.current.focus();
    }
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length !== 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: todos.every(t => t.completed),
              })}
              data-cy="ToggleAllButton"
              onClick={() => dispatch({ type: 'TOGGLE_ALL' })}
            />
          )}

          <form onSubmit={onSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={mainInputRef}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && <TodoList />}

        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
