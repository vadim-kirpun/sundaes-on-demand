import { rest } from 'msw';

import { setup, screen, waitFor } from '../../../helpers/test-utils';
import server from '../../../mocks/server';
import OrderEntry from '../OrderEntry';

test('handles error for scoops and toppings routes', async () => {
  const errorResolver = (req, res, ctx) => res(ctx.status(500));

  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', errorResolver),
    rest.get('http://localhost:3030/toppings', errorResolver)
  );

  setup(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(() => {
    const alerts = screen.getAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

test('disable order button if there are no scoops ordered', async () => {
  const { user } = setup(<OrderEntry setOrderPhase={jest.fn()} />);

  // order button should be disabled at first, even before options load
  let orderButton = screen.getByRole('button', { name: /order sundae/i });
  expect(orderButton).toBeDisabled();

  // expect button to be enabled after adding scoop
  const vanilla = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await user.clear(vanilla);
  await user.type(vanilla, '2');
  expect(orderButton).toBeEnabled();

  // expect button to be disabled again after removing scoop
  await user.clear(vanilla);
  await user.type(vanilla, '0');
  expect(orderButton).toBeDisabled();
});
