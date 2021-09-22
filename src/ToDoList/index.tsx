import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { fetchTodos, sortToDos, updateToDo } from './utils';
import ToDo from '../ToDo';
import { ToDosJSONResponse  } from '../types';

const StatusWrapper = styled.div`
	height: 25px;
`;

const ToDoList = () => {
  const toDosQuery = useQuery<ToDosJSONResponse>('todos', fetchTodos);

  const queryClient = useQueryClient();
  const todoMutation = useMutation(updateToDo, {
		onMutate: (requestParameters) => {
			const previousToDos = queryClient.getQueryData<ToDosJSONResponse>('todos')
			return previousToDos?.map((previousToDo) => {
				if (previousToDo.id === requestParameters.toDoId) {
					previousToDo.isComplete = requestParameters.isComplete;
					return previousToDo;
				}

				return previousToDo;
			})

		}
  })

	if (toDosQuery.isIdle || toDosQuery.isLoading) {
		return <span>Loading...</span>
	}

	if (toDosQuery.isError) {
		return <span>Oops. Something went wrong...</span>
	}

	return (
		<>
			<StatusWrapper>{todoMutation.isLoading && 'Updating...'}</StatusWrapper>
			{sortToDos(toDosQuery.data).map((todo) => (
				<ToDo
					description={todo.description}
					dueDate={todo.dueDate}
					isComplete={todo.isComplete}
					onCheckboxChange={() => {
						todoMutation.mutate({ isComplete: !todo.isComplete, toDoId: todo.id})}
					}
					key={todo.id}
				/>
			))}
		</>
	)

}

export default ToDoList;