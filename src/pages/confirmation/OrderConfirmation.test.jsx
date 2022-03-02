import { rest } from 'msw';
import server from '../../mocks/server';
import { setup, screen } from '../../helpers/test-utils';
import OrderConfirmation from './OrderConfirmation';

test('error response from server for submitting order', async () => {
  server.use(
    rest.post('http://localhost:3030/order', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  setup(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent(
    'An unexpected error occurred. Please try again later.'
  );
});
