import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders application', () => {
  const { getByText, getByLabelText } = render(<App />);

  getByText('TODOS');
  getByLabelText('What needs to be done?');
  getByText('Add #1');
});

test('allows users to add items', () => {
  const { getByText, getByLabelText } = render(<App />);

  const itemInput = getByLabelText('What needs to be done?');
  const addButton = getByText(/Add/g);

  fireEvent.change(itemInput, { target: { value: 'Learn how to write test' } });
  fireEvent.click(addButton);

  expect(getByText('Learn how to write test')).toBeInTheDocument();
});

test('wont allows users to add null items', () => {
  const { getByText, container } = render(<App />);

  const addButton = getByText(/Add/g);

  fireEvent.click(addButton);

  expect(container.querySelector('li')).not.toBeInTheDocument();
});

test('users can create 500 items', () => {
  const { getByText, getByLabelText } = render(<App />);

  const itemInput = getByLabelText('What needs to be done?');
  const addButton = getByText(/Add/g);

  for (let i = 0; i < 500; i++) {
    fireEvent.change(itemInput, { target: { value: i } });
    fireEvent.click(addButton);

    getByText(i);
  }
});
