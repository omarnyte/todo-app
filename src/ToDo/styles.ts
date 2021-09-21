import styled from 'styled-components';

export const ToDoWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
	padding: 5px;
	background: pink;

	@media (min-width: 400px) {
		width: 500px;
	}
`;

export const DescriptionLabel = styled.label<{ shouldStrikeThrough: boolean }>`
	text-decoration: ${({ shouldStrikeThrough }) => shouldStrikeThrough && "line-through"};
`;

export const DueDate = styled.span`
	border: 1px solid black;
	padding: 2px;
`;
