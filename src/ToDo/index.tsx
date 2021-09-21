import { CheckboxInput, DescriptionLabel, DueDate, ToDoWrapper } from './styles';

export type TodoProps = {
	description: string;
	dueDate: string | null;
	isComplete: boolean;
	onCheckboxChange: () => void;
}

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const month = date.getMonth() <= 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
	const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
	return `${month}/${day}/${date.getFullYear()}`;
}

const Todo = ({ description, dueDate, isComplete, onCheckboxChange }: TodoProps) => {
	const determineBackgroundColor = () => {
		if (isComplete) return 'lightgreen';

		const isOverdue = dueDate && new Date(dueDate) < new Date();
		if (isOverdue) {
			return 'pink';
		}

		return 'lightgray'; 
	}
	
	return (
		<ToDoWrapper backgroundColor={determineBackgroundColor()}>
			<div>
				<CheckboxInput
					checked={isComplete}
					id={description}
					onChange={onCheckboxChange}
					type="checkbox"
				/>
				<DescriptionLabel
					data-testid="to-do-description"
					htmlFor={description}
					shouldStrikeThrough={isComplete}
				>
					{description}
				</DescriptionLabel>
			</div>

			{dueDate && <DueDate>{formatDate(dueDate)}</DueDate>}
		</ToDoWrapper>
	)
}

export default Todo;
