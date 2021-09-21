import { rest } from 'msw'

import { TODOS_ENDPOINT } from '../constants';

export const handlers = [
  rest.get(TODOS_ENDPOINT, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json(
				[
					{
						"id": "1",
						"description": "First Item",
						"isComplete": true,
						"dueDate": "2020-03-10T17:50:44.673Z"
					},
					{
						"id": "2",
						"description": "Second Item",
						"isComplete": true,
						"dueDate": null
					},
					{
						"id": "3",
						"description": "Third Item",
						"isComplete": false,
						"dueDate": "2020-06-26T19:00:00.000Z"
					},
					{
						"id": "4",
						"description": "Fourth Item",
						"isComplete": false,
						"dueDate": null
					},
					{
						"id": "5",
						"description": "Fifth Item",
						"isComplete": false,
						"dueDate": "2020-06-24T15:45:00.000Z"
					},
					{
						"id": "6",
						"description": "Sixth Item",
						"isComplete": false,
						"dueDate": "2021-03-21T13:30:00.000Z"
					}
				]
			),
		)
	})
];