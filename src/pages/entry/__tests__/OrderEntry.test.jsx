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

  setup(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});
