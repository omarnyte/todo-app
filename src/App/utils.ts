import { ToDo, ToDosJSONResponse } from './types';

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