import { setup, screen } from '../../../helpers/test-utils';
import Options from '../components/Options';

test('displays image for each scoop from server', async () => {
  setup(<Options optionType="scoops" />);

  // find images
  const images = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(images).toHaveLength(2);

  // confirm alt text of images
  const altText = images.map((el) => el.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping from server', async () => {
  setup(<Options optionType="toppings" />);

  const images = await screen.findAllByRole('img', {
    name: /topping$/i,
  });
  expect(images).toHaveLength(3);

  const altText = images.map((el) => el.alt);
  expect(altText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});

test("don't update total if scoops input is invalid", async () => {
  const { user } = setup(<Options optionType="scoops" />);

  const vanilla = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await user.type(vanilla, '-1');

  const subtotal = screen.getByText('Scoops total: $0.00');
  expect(subtotal).toBeInTheDocument();
});
