/* eslint-disable jsx-a11y/label-has-associated-control */
import { Todo, useTodos } from '../TodoContext';
import cn from 'classnames';
import { EditingForm } from '../EditingForm';
import React, { memo } from 'react';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = memo(({ todo }) => {
  const { dispatch, editingTodoId } = useTodos();

  return (
    <div
      data-cy="Todo"
      className={cn('todo', { completed: todo.completed })}
      onDoubleClick={() =>
        dispatch({ type: 'SET_EDITING_ID', payload: todo.id })
      }
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onClick={() =>
            dispatch({
              type: 'TOGGLE',
              payload: todo.id,
            })
          }
          checked={todo.completed}
        />
      </label>

      {editingTodoId === todo.id ? (
        <EditingForm todo={todo} />
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => dispatch({ type: 'DELETE', payload: todo.id })}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
});

TodoItem.displayName = 'Todo Item';
