import { memo, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import ScoopOption from './ScoopOption';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data));
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponent key={name} name={name} imagePath={imagePath} />
  ));

  return <Row>{optionItems}</Row>;
};

Options.propTypes = {
  optionType: PropTypes.oneOf(['scoops', 'toppings']).isRequired,
};

export default memo(Options);
