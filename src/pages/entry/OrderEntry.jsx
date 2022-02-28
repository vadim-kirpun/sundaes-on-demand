import { memo } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { useOrderDetails } from '../../context/OrderDetails';
import Options from './components/Options';

const OrderEntry = ({ setOrderPhase }) => {
  const [{ totals }] = useOrderDetails();

  const handleClick = () => setOrderPhase('review');

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />

      <h2>Grand total: {totals.grandTotal}</h2>

      <Button onClick={handleClick}>Order Sundae!</Button>
    </div>
  );
};

OrderEntry.propTypes = {
  setOrderPhase: PropTypes.func.isRequired,
};

export default memo(OrderEntry);
