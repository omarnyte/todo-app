import { ToDosJSONResponse } from '../types';
import { rest } from 'msw'

import { TODOS_ENDPOINT } from '../constants';

export const handlers = [
  rest.get(TODOS_ENDPOINT, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json<ToDosJSONResponse>(
				[
					{
						"id": "1",
						"description": "First Complete Item",
						"isComplete": true,
						"dueDate": "2020-03-10T17:50:44.673Z"
					},
					{
						"id": "2",
						"description": "Second Complete Item",
						"isComplete": true,
						"dueDate": null
					},
					{
						"id": "3",
						"description": "Second Overdue Item",
						"isComplete": false,
						"dueDate": "2020-06-26T19:00:00.000Z"
					},
					{
						"id": "4",
						"description": "First Pending Item",
						"isComplete": false,
						"dueDate": null
					},
					{
						"id": "5",
						"description": "First Overdue Item",
						"isComplete": false,
						"dueDate": "2020-06-24T15:45:00.000Z"
					},
					{
						"id": "6",
						"description": "Third Overdue Item",
						"isComplete": false,
						"dueDate": "2021-03-21T13:30:00.000Z"
					}
				]
			),
		)
	}),
	rest.patch('https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/patch/:toDoId', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({ "status": "success" })
		)
	})
];