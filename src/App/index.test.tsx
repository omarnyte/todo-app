import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { server } from '../mocks/server.js'

import App from '.';

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders the app heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading');
  expect(heading).toHaveTextContent('Todo App');
});

test('renders To Do list items in order', async () => {
  render(<App />);

  await waitForElementToBeRemoved(screen.getByText('Loading...'));

  const descriptions = screen.getAllByTestId('to-do-description')
  expect(descriptions[0]).toHaveTextContent('Fifth Item');
  expect(descriptions[1]).toHaveTextContent('Third Item');
  expect(descriptions[2]).toHaveTextContent('Sixth Item');
  expect(descriptions[3]).toHaveTextContent('Fourth Item');
  expect(descriptions[4]).toHaveTextContent('First Item');
  expect(descriptions[5]).toHaveTextContent('Second Item');
});
