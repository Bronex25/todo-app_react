import React, { useMemo } from 'react';
import { TodoItem } from '../TodoItem';
import { useTodos } from '../TodoContext';

export const TodoList: React.FC = () => {
  const { todos, filter } = useTodos();

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case 'ACTIVE':
          return !todo.completed;
        case 'COMPLETED':
          return todo.completed;
        default:
          return true;
      }
    });
  }, [todos, filter]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
