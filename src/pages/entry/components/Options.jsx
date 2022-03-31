import { memo, useCallback } from 'react';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { useOptions } from '../../../api';
import { useOrderDetails } from '../../../context/OrderDetails';
import { formatCurrency } from '../../../helpers/format';
import { PRICE_PER_ITEM } from '../../../constants';
import AlertBanner from '../../common/AlertBanner';
import ToppingOption from './ToppingOption';
import ScoopOption from './ScoopOption';

const Options = ({ optionType }) => {
  const { data, error } = useOptions(optionType);

  const [orderDetails, updateItemCount] = useOrderDetails();

  const onChange = useCallback(
    (itemName, newItemCount) => {
      updateItemCount(itemName, newItemCount, optionType);
    },
    [optionType, updateItemCount]
  );

  if (error) return <AlertBanner />;

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  const price = `${formatCurrency(PRICE_PER_ITEM[optionType])} each`;
  const total = `${title} total: ${orderDetails.totals[optionType]}`;

  return (
    <>
      <h2>{title}</h2>
      <p>{price}</p>
      <p>{total}</p>

      <Row>
        {data.map(({ name, imagePath }) => (
          <ItemComponent
            key={name}
            name={name}
            onChange={onChange}
            imagePath={imagePath}
          />
        ))}
      </Row>
    </>
  );
};

Options.propTypes = {
  optionType: PropTypes.oneOf(['scoops', 'toppings']).isRequired,
};

export default memo(Options);
