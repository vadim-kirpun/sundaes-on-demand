import { memo } from 'react';
import Options from './Options';

const OrderEntry = () => (
  <div>
    <Options optionType="scoops" />
    <Options optionType="toppings" />
  </div>
);

export default memo(OrderEntry);
