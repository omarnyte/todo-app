import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import ToDo, { TodoProps } from './index';

describe('ToDo', () => {
	const defaultProps: TodoProps = {
		description: 'Some description',
		dueDate: null,
		isComplete: false,
		onCheckboxChange: () => {},
	}

	describe('the checkbox', () => {
		it('invokes the onCheckboxChange prop when clicking the checkbox', () => {
			const onCheckboxChangeSpy = jest.fn();
			render(<ToDo {...defaultProps} onCheckboxChange={onCheckboxChangeSpy}/>);

			userEvent.click(screen.getByRole('checkbox'));

			expect(onCheckboxChangeSpy).toHaveBeenCalled();
		});

		it('invokes the onCheckboxChange prop when clicking the label', () => {
			const description = 'Some label';
			const onCheckboxChangeSpy = jest.fn();
			render(<ToDo {...defaultProps} description={description} onCheckboxChange={onCheckboxChangeSpy}/>);

			userEvent.click(screen.getByLabelText(description));

			expect(onCheckboxChangeSpy).toHaveBeenCalled();
		});
	});
	
	it('formats the due date with leading zeroes for the month and day', () => {
		const dueDate = '2020-01-02T17:50:44.673Z';
		render(<ToDo {...defaultProps} dueDate={dueDate}/>);

		expect(screen.getByText('01/02/2020')).toBeInTheDocument();
	});
});
