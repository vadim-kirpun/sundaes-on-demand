import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { useOrderDetails } from '../../context/OrderDetails';
import SummaryForm from './components/SummaryForm';

const OrderSummary = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();

  const scoopArray = Array.from(orderDetails.scoops);
  const toppingArray = Array.from(orderDetails.toppings);

  const hasToppings = orderDetails.toppings.size > 0;

  return (
    <div>
      <h1>Order Summary</h1>

      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>
        {scoopArray.map(([key, value]) => (
          <li key={key}>
            {value} {key}
          </li>
        ))}
      </ul>

      {hasToppings && (
        <>
          <h2>Toppings: {orderDetails.totals.toppings}</h2>
          <ul>
            {toppingArray.map(([key]) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </>
      )}

      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};

OrderSummary.propTypes = {
  setOrderPhase: PropTypes.func.isRequired,
};

export default memo(OrderSummary);
