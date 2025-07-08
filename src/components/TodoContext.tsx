import React, { ReactNode, useContext, useEffect, useReducer } from 'react';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type TodoContextType = {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
  editingTodoId: number | null;
  filter: Filter;
};

type Filter = 'ALL' | 'COMPLETED' | 'ACTIVE';

type State = {
  todos: Todo[];
  editingTodoId: number | null;
  filter: Filter;
};

type Action =
  | { type: 'SET'; payload: Todo[] }
  | { type: 'ADD'; payload: string }
  | { type: 'DELETE'; payload: number }
  | { type: 'TOGGLE'; payload: number }
  | { type: 'TOGGLE_ALL' }
  | { type: 'EDIT'; payload: { id: number; newTitle: string } }
  | { type: 'SET_EDITING_ID'; payload: number | null }
  | { type: 'SET_FILTER'; payload: Filter }
  | { type: 'CLEAR_COMPLETED' };

const TodoContext = React.createContext<TodoContextType | undefined>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET':
      return { ...state, todos: action.payload };
    case 'ADD':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), title: action.payload, completed: false },
        ],
      };
    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'CLEAR_COMPLETED':
      return { ...state, todos: state.todos.filter(t => !t.completed) };
    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case 'SET_EDITING_ID':
      return { ...state, editingTodoId: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'EDIT':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.newTitle }
            : todo,
        ),
      };
    case 'TOGGLE_ALL':
      const toCompleteAll = state.todos.some(todo => !todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({ ...todo, completed: toCompleteAll })),
      };

    default:
      return state;
  }
}

const initialState: State = {
  todos: [],
  editingTodoId: null,
  filter: 'ALL',
};

export const TodoContexProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      dispatch({ type: 'SET', payload: JSON.parse(savedTodos) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        dispatch,
        editingTodoId: state.editingTodoId,
        filter: state.filter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }

  return context;
};
