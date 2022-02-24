import { render, screen } from '@testing-library/react';
import { setup } from '../../../helpers';
import SummaryForm from '../SummaryForm';

test('initial conditions', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', { name: /i agree/i });
  expect(checkbox).not.toBeChecked();

  const button = screen.getByRole('button', { name: 'Confirm order' });
  expect(button).toBeDisabled();
});

test('checkbox enables the button on first click and disables the button on second click', async () => {
  const { user } = setup(<SummaryForm />);

  const button = screen.getByRole('button', { name: 'Confirm order' });
  const checkbox = screen.getByRole('checkbox', { name: /i agree/i });

  await user.click(checkbox);
  expect(button).toBeEnabled();

  await user.click(checkbox);
  expect(button).toBeDisabled();
});

test('popover responds to hover', async () => {
  const { user } = setup(<SummaryForm />);
  const popoverText = /no ice cream/i;

  const trigger = screen.getByText(/terms and conditions/i);
  const nullPopover = screen.queryByText(popoverText);

  expect(nullPopover).not.toBeInTheDocument();

  await user.hover(trigger);

  const popover = screen.getByText(popoverText);
  expect(popover).toBeInTheDocument();

  await user.unhover(trigger);

  expect(popover).not.toBeInTheDocument();
});
