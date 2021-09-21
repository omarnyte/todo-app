import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ToDo from '../ToDo';

type Todo = {
  id: string;
  description: string;
  dueDate: string | null;
  isComplete: boolean;
}

type TodosJSONResponse = Todo[];

const TODOS_ENDPOINT = 'https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/get';
const API_KEY = 'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  margin-bottom: 10px;
  padding-left: 10px;
  width: 100%;
  background-color: #363754;
`;

const H1 = styled.h1`
  color: white;
  font-size: 18px;
`;

function App() {
  const [todosData, setTodosData] = useState<TodosJSONResponse>([]);
  
  useEffect(() => {
    const fetchTodos = async () => {
      const headers = { 'X-Api-Key': API_KEY };
      const todosResponse = await fetch(TODOS_ENDPOINT, { headers });
      const todosJsonResponse: TodosJSONResponse = await todosResponse.json();
      setTodosData(todosJsonResponse);
    }

    fetchTodos();
  }, [])
  
  return (
    <AppWrapper className="App">
      <HeaderWrapper>
        <H1>Todo App</H1>
      </HeaderWrapper>
      {todosData.map((todo) => (
        <ToDo
          description={todo.description}
          dueDate={todo.dueDate}
          isComplete={todo.isComplete}
          // TODO: make API call
          onCheckboxChange={() => alert('clicked')}
          key={todo.id}
        />
      ))}
    </AppWrapper>
  );
}

export default App;
