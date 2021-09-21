import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { server } from '../mocks/server.js'

import App from '.';

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Mocks located in 'src/mocks/handlers.js'

const queryClient = new QueryClient();

test('renders the app heading', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
  const heading = screen.getByRole('heading');
  expect(heading).toHaveTextContent('Todo App');
});

test('renders To Do list items in order', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitForElementToBeRemoved(screen.getByText('Loading...'));

  const descriptions = screen.getAllByTestId('to-do-description')
  expect(descriptions[0]).toHaveTextContent('First Overdue Item');
  expect(descriptions[1]).toHaveTextContent('Second Overdue Item');
  expect(descriptions[2]).toHaveTextContent('Third Overdue Item');
  expect(descriptions[3]).toHaveTextContent('First Pending Item');
  expect(descriptions[4]).toHaveTextContent('First Complete Item');
  expect(descriptions[5]).toHaveTextContent('Second Complete Item');
});
