import { memo, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data));
  }, [optionType]);

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
