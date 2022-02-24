import { fireEvent, render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test('initial conditions', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', { name: /i agree/i });
  expect(checkbox).not.toBeChecked();

  const button = screen.getByRole('button', { name: 'Confirm order' });
  expect(button).toBeDisabled();
});

test('checkbox enables the button on first click and disables the button on second click', () => {
  render(<SummaryForm />);

  const button = screen.getByRole('button', { name: 'Confirm order' });
  const checkbox = screen.getByRole('checkbox', { name: /i agree/i });

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
});
