import { memo, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import AlertBanner from '../common/AlertBanner';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => {
        setItems(res.data);
        setError(null);
      })
      .catch(setError);
  }, [optionType]);

  if (error) return <AlertBanner />;

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  return (
    <Row>
      {items.map(({ name, imagePath }) => (
        <ItemComponent key={name} name={name} imagePath={imagePath} />
      ))}
    </Row>
  );
};

Options.propTypes = {
  optionType: PropTypes.oneOf(['scoops', 'toppings']).isRequired,
};

export default memo(Options);
