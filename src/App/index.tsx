import { useEffect, useState } from 'react';

import { AppWrapper, H1, HeadingWrapper } from './styles';
import { sortToDos } from './utils';
import { ToDosJSONResponse  } from './types';
import ToDo from '../ToDo';
import { TODOS_ENDPOINT } from '../constants';

const API_KEY = 'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c';

function App() {
  const [todosData, setTodosData] = useState<ToDosJSONResponse>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      const headers = { 'X-Api-Key': API_KEY };
      const todosResponse = await fetch(TODOS_ENDPOINT, { headers });
      const todosJsonResponse: ToDosJSONResponse = await todosResponse.json();
      setIsLoading(false);
      setTodosData(todosJsonResponse);
    }

    setIsLoading(true);
    fetchTodos();
  }, [])

  const sortedTodos = sortToDos(todosData);

  return (
    <AppWrapper className="App">
      <HeadingWrapper>
        <H1>Todo App</H1>
      </HeadingWrapper>

      {isLoading ? (
        <span>Loading...</span>
      ): (
        <>
          {sortedTodos.map((todo) => (
            <ToDo
              description={todo.description}
              dueDate={todo.dueDate}
              isComplete={todo.isComplete}
              onCheckboxChange={() => alert('clicked')}
              key={todo.id}
            />
          ))}
        </>
      ) 
    }

    </AppWrapper>
  );
}

export default App;
