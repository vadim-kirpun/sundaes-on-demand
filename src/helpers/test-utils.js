import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrderDetailsProvider from '../context/OrderDetails';

const renderWithContext = (jsx, options) => {
  return render(jsx, { wrapper: OrderDetailsProvider, ...options });
};

export const setup = (jsx, options) => ({
  user: userEvent.setup(),
  ...renderWithContext(jsx, options),
});

export * from '@testing-library/react';
