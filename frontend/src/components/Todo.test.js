import React from 'react';
import { render, screen, waitFor } from '../test-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Todo from './Todo';

describe('todo component', () => {
  it('renders correctly in both view & edit mode', async () => {
    render(
      <Todo
        todo={{
          title: 'xylophone practice',
          notes: 'go crazy with it',
          dueDate: '2022-06-01',
          list: '',
        }}
      />,
    );

    const title = screen.getByText(/xylophone practice/i);
    expect(title).toBeInTheDocument();
    const notes = screen.getByText(/go crazy with it/i);
    expect(notes).toBeInTheDocument();
    const dueDate = screen.getByText(/06-01-2022/i);
    expect(dueDate).toBeInTheDocument();

    const edit = screen.getByTestId('edit');
    console.log(edit);
    userEvent.click(edit);

    await waitFor(() =>
      expect(screen.getByLabelText('title')).toHaveValue('xylophone practice'),
    );
    await waitFor(() =>
      expect(screen.getByLabelText('notes')).toHaveValue('go crazy with it'),
    );
    await waitFor(() =>
      expect(screen.getByLabelText('due date')).toHaveValue('2022-06-01'),
    );
  });
});
