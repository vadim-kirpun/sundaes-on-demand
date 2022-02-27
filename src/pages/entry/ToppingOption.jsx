import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Col, Form } from 'react-bootstrap';

const ToppingOption = ({ name, imagePath, onChange }) => {
  const handleChange = useCallback(
    (event) => {
      onChange(name, Number(event.target.checked));
    },
    [name, onChange]
  );

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} topping`}
      />

      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" onChange={handleChange} label={name} />
      </Form.Group>
    </Col>
  );
};

ToppingOption.propTypes = {
  name: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
};

export default memo(ToppingOption);
