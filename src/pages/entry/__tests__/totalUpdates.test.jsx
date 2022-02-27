import { screen } from '@testing-library/react';

import { setup } from '../../../helpers/test-utils';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

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

describe('grand total', () => {
  test('updates properly if scoop is added first', async () => {
    const { user } = setup(<OrderEntry />);

    const total = screen.getByRole('heading', { name: /grand total: \$/i });

    // check that the total starts at 0
    expect(total).toHaveTextContent('0.00');

    // add scoop
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });

    await user.clear(chocolateInput);
    await user.type(chocolateInput, '2');

    expect(total).toHaveTextContent('4.00');

    // add topping
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    await user.click(cherriesCheckbox);
    expect(total).toHaveTextContent('5.50');
  });

  test('updates properly if topping is added first', async () => {
    const { user } = setup(<OrderEntry />);

    const total = screen.getByRole('heading', { name: /grand total: \$/i });

    // add topping
    const mmsCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });
    await user.click(mmsCheckbox);
    expect(total).toHaveTextContent('1.50');

    // add scoop
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '3');

    expect(total).toHaveTextContent('7.50');
  });

  test('updates properly if item is removed', async () => {
    const { user } = setup(<OrderEntry />);

    const total = screen.getByRole('heading', { name: /grand total: \$/i });

    // add topping
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });

    await user.click(cherriesCheckbox);
    expect(total).toHaveTextContent('1.50');

    // add and remove scoop
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2');
    expect(total).toHaveTextContent('5.50');

    await user.type(vanillaInput, '1');
    expect(total).toHaveTextContent('3.50');
  });
});
