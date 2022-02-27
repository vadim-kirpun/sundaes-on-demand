import { setup } from '../helpers/test-utils';
import App from '../App';

test('order phases for happy path', () => {
  const { user } = setup(<App />, { wrapper: null });

  // add ice cream scoops and toppings

  // find and click order button

  // check summary info based on order

  // accept terms and conditions and click button to confirm order

  // confirm order number on confirmation page

  // click "new order" button on confirmation page

  // check that scoops and toppings subtotals have been reset
});
