import Checkbox from '@mui/material/Checkbox';
import { DescriptionLabel, DueDate, LeftWrapper, ToDoWrapper } from './styles';

const colors = {
	gray: '#f2f2f2',
	green: '#cdffcc',
	red: '#ffcccc',
}

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
		if (isComplete) return colors.green;

		const isOverdue = dueDate && new Date(dueDate) < new Date();
		if (isOverdue) {
			return colors.red;
		}

		return colors.gray; 
	}
	
	return (
		<ToDoWrapper backgroundColor={determineBackgroundColor()}>
			<LeftWrapper>
				<Checkbox
					checked={isComplete}
					id={description}
					onChange={onCheckboxChange}
					size="small"
					sx={{
						color: 'black',
						'&.Mui-checked': {
							color: 'black',
						},
					}}
				/>
				<DescriptionLabel
					data-testid="to-do-description"
					htmlFor={description}
					shouldStrikeThrough={isComplete}
				>
					{description}
				</DescriptionLabel>
			</LeftWrapper>

			{dueDate && <DueDate>{formatDate(dueDate)}</DueDate>}
		</ToDoWrapper>
	)
}

export default Todo;
