import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { server } from '../mocks/server.js'
import userEvent from '@testing-library/user-event'

import App from '.';

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Mocks located in 'src/mocks/handlers.ts'

test('renders the app heading', () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>
  );
  const heading = screen.getByRole('heading');
  expect(heading).toHaveTextContent('Todo App');
});

test('renders To Do list items in order', async () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
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

describe('updating items', () => {
  it('checks and sorts after clicking on an incomplete item', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>
    );

    await waitForElementToBeRemoved(screen.getByText('Loading...'));

    userEvent.click(screen.getByLabelText('Third Overdue Item'));

    await waitFor(() => {
      const descriptions = screen.getAllByTestId('to-do-description')
      expect(descriptions[0]).toHaveTextContent('First Overdue Item');
      expect(descriptions[1]).toHaveTextContent('Second Overdue Item');
      expect(descriptions[2]).toHaveTextContent('Third Overdue Item');
      expect(descriptions[3]).toHaveTextContent('First Pending Item');
      expect(descriptions[4]).toHaveTextContent('First Complete Item');
      expect(descriptions[5]).toHaveTextContent('Second Complete Item');
    });
  });

  it('unchecks and sorts after clicking on a completed item', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>
    );

    await waitForElementToBeRemoved(screen.getByText('Loading...'));

    userEvent.click(screen.getByLabelText('First Complete Item'));

    await waitFor(() => {
      const descriptions = screen.getAllByTestId('to-do-description')
      expect(descriptions[0]).toHaveTextContent('First Complete Item');
      expect(descriptions[1]).toHaveTextContent('First Overdue Item');
      expect(descriptions[2]).toHaveTextContent('Second Overdue Item');
      expect(descriptions[3]).toHaveTextContent('Third Overdue Item');
      expect(descriptions[4]).toHaveTextContent('First Pending Item');
      expect(descriptions[5]).toHaveTextContent('Second Complete Item');
    });
  });
});
