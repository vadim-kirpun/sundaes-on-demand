import React, { memo, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import { useOrderDetails } from '../../context/OrderDetails';
import AlertBanner from '../common/AlertBanner';

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then((res) => {
        setOrderNumber(res.data.orderNumber);
      })
      .catch(setError);
  }, []);

  const handleClick = () => {
    resetOrder();
    setOrderPhase('inProgress');
  };

  if (error) return <AlertBanner />;

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
