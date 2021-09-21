import { useQuery } from 'react-query';

import { AppWrapper, H1, HeadingWrapper } from './styles';
import { sortToDos } from './utils';
import { ToDosJSONResponse  } from '../types';
import ToDo from '../ToDo';
import { TODOS_ENDPOINT } from '../constants';

const API_KEY = 'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c';

function App() {
  const todosQuery = useQuery<ToDosJSONResponse>('todos', async () => {
    const headers = { 'X-Api-Key': API_KEY };
    const response = await fetch(TODOS_ENDPOINT, { headers });
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
  
    return response.json()
  });

  return (
    <AppWrapper className="App">
      <HeadingWrapper>
        <H1>Todo App</H1>
      </HeadingWrapper>

      {todosQuery.isLoading ? (
        <span>Loading...</span>
      ): (
        <>
          {todosQuery.data && sortToDos(todosQuery.data).map((todo) => (
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
