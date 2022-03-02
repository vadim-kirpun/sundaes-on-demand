import { setup, screen } from '../../../helpers/test-utils';
import ScoopOption from '../components/ScoopOption';

test('indicate if scoop count is non-int ot out of range', async () => {
  const { user } = setup(
    <ScoopOption name="" imagePath="" onChange={jest.fn()} />
  );

  // expect input to be invalid with negative number
  const vanilla = screen.getByRole('spinbutton');
  await user.clear(vanilla);
  await user.type(vanilla, '-1');
  expect(vanilla).toHaveClass('is-invalid');

  // replace with decimal input
  await user.clear(vanilla);
  await user.type(vanilla, '2.5');
  expect(vanilla).toHaveClass('is-invalid');

  // replace with too high input
  await user.clear(vanilla);
  await user.type(vanilla, '11');
  expect(vanilla).toHaveClass('is-invalid');

  // replace with valid input
  await user.clear(vanilla);
  await user.type(vanilla, '3');
  expect(vanilla).not.toHaveClass('is-invalid');
});
