import React, { memo, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { useCreateOrder } from '../../api';
import { useOrderDetails } from '../../context/OrderDetails';
import AlertBanner from '../common/AlertBanner';

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();

  const mutation = useCreateOrder();
  const { orderNumber } = mutation.data ?? {};

  useEffect(() => {
    mutation.mutate();
  }, [mutation.mutate]);

  const handleClick = () => {
    resetOrder();
    setOrderPhase('inProgress');
  };

  if (mutation.error) return <AlertBanner />;

  if (!orderNumber) return <div>Loading</div>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Thank you!</h1>

      <p>Your order number is {orderNumber}</p>
      <p style={{ fontSize: '25%' }}>
        as per our terms and conditions, nothing will happen now
      </p>

      <Button onClick={handleClick}>Create new order</Button>
    </div>
  );
};

OrderConfirmation.propTypes = {
  setOrderPhase: PropTypes.func.isRequired,
};

export default memo(OrderConfirmation);
