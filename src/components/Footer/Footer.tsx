/* eslint-disable react/display-name */
import React, { memo } from 'react';
import { useTodos } from '../TodoContext';
export const Footer: React.FC = memo(() => {
  const { todos, filter, dispatch } = useTodos();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(t => !t.completed).length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          data-cy="FilterLinkAll"
          className={`filter__link ${filter === 'ALL' ? 'selected' : ''}`}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'ALL' })}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filter === 'ACTIVE' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'ACTIVE' })}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filter === 'COMPLETED' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'COMPLETED' })}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
        disabled={!todos.some(t => t.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
});
