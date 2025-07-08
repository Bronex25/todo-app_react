/* eslint-disable react/display-name */
import React, { memo, useRef, useEffect } from 'react';
import { Todo, useTodos } from '../TodoContext';

type Props = {
  todo: Todo;
};

export const EditingForm: React.FC<Props> = memo(({ todo }) => {
  const { dispatch } = useTodos();

  const editInputRef = useRef<HTMLInputElement>(null);

  const onEsc = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      dispatch({ type: 'SET_EDITING_ID', payload: null });
    }
  };

  const onSubmit = () => {
    let newTitle = '';

    if (editInputRef.current) {
      newTitle = editInputRef.current?.value.trim();
    }

    if (newTitle !== '') {
      dispatch({ type: 'EDIT', payload: { id: todo.id, newTitle } });
    } else {
      dispatch({ type: 'DELETE', payload: todo.id });
    }

    dispatch({ type: 'SET_EDITING_ID', payload: null });
  };

  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  }, []);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        onSubmit();
      }}
      onBlur={onSubmit}
      onKeyUp={onEsc}
    >
      <input
        data-cy="TodoTitleField"
        type="text"
        ref={editInputRef}
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        defaultValue={todo.title}
      />
    </form>
  );
});
