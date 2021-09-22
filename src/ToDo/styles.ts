import styled from 'styled-components';

export const ToDoWrapper = styled.div<{ backgroundColor: string }>`
	display: flex;
	justify-content: space-between;
	align-items: center;

	margin-bottom: 10px;
	height: 25px;
	width: 95%;
	padding: 5px;
	background: ${({ backgroundColor }) => backgroundColor};

	@media (min-width: 510px) {
		width: 500px;
	}
`;

export const LeftWrapper = styled.div`
	display: flex;
	align-items: center;
`;

export const DescriptionLabel = styled.label<{ shouldStrikeThrough: boolean }>`
	text-decoration: ${({ shouldStrikeThrough }) => shouldStrikeThrough && "line-through"};
	cursor: pointer;
`;

export const DueDate = styled.span`
	border: 1px solid black;
	width: 90px; 
	padding: 2px;
	text-align: center;
`;
