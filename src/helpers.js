import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const setup = (jsx) => ({
  user: userEvent.setup(),
  ...render(jsx),
});
