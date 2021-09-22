import { ToDo, ToDosJSONResponse } from '../types';
import { TODOS_ENDPOINT } from '../constants';

const sortByDate = (toDos: ToDo[]) => {
	return toDos.sort((firstToDo, secondToDo) => {
		if (!firstToDo.dueDate && !secondToDo.dueDate) return 0; 
		if (!firstToDo.dueDate) return 1; 
		if (!secondToDo.dueDate) return -1; 
		
		const firstDate = new Date(firstToDo.dueDate);
		const secondDate = new Date(secondToDo.dueDate);
		return Number(firstDate) - Number(secondDate); 
	});
}

export const sortToDos = (toDos: ToDosJSONResponse): ToDosJSONResponse => {
	const overDueItems: ToDo[] = [];
	const pendingItems: ToDo[] = []; 
	const completedItems: ToDo[] = [];

	for (let toDo of toDos) {
		const hasDueDatePassed = toDo.dueDate && new Date(toDo.dueDate) < new Date();
		const isOverdue = hasDueDatePassed && !toDo.isComplete;
		if (isOverdue) {
			overDueItems.push(toDo)
		} else if (toDo.isComplete) {
			completedItems.push(toDo);
		} else {
			pendingItems.push(toDo);
		}
	}

	return [
		...sortByDate(overDueItems),
		...sortByDate(pendingItems),
		...sortByDate(completedItems)
	];
}

const API_KEY = 'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c';
const headers = { 'X-Api-Key': API_KEY };

export const fetchTodos = async () => {
	const response = await fetch(TODOS_ENDPOINT, { headers });
	if (!response.ok) {
		throw new Error('Network response was not ok')
	}

	return response.json()
}

const generateToDoPatchEndpoint = (toDoId: string) => `https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/patch/${toDoId}`;

export const updateToDo = async ({ isComplete, toDoId }: { isComplete: boolean; toDoId: string }) => {
	const body = JSON.stringify({ isComplete });
	const response = await fetch(generateToDoPatchEndpoint(toDoId), {
		body,
		headers, 
		method: 'PATCH',
	});
	if (!response.ok) {
		throw new Error('Network response was not ok')
	}

	return response.json()
};