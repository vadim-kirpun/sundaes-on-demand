import { screen } from '@testing-library/react';

import { setup } from '../../../helpers/test-utils';
import Options from '../Options';

test('update scoops subtotal when scoops changed', async () => {
  const { user } = setup(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const subtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(subtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');

  expect(subtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');

  expect(subtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings changed', async () => {
  const { user } = setup(<Options optionType="toppings" />);

  const subtotal = screen.getByText('Toppings total: $', { exact: false });
  expect(subtotal).toHaveTextContent('0.00');

  // check cherries box
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  expect(cherriesCheckbox).not.toBeChecked();

  await user.click(cherriesCheckbox);
  expect(cherriesCheckbox).toBeChecked();
  expect(subtotal).toHaveTextContent('1.50');

  // check M&Ms box
  const mmsCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });

  await user.click(mmsCheckbox);
  expect(subtotal).toHaveTextContent('3.00');

  // uncheck cherries box
  await user.click(cherriesCheckbox);
  expect(subtotal).toHaveTextContent('1.50');
});
