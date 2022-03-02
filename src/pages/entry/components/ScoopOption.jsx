import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Row } from 'react-bootstrap';

const ScoopOption = ({ name, imagePath, onChange }) => {
  const [isValid, setIsValid] = useState(true);

  const handleChange = useCallback(
    (event) => {
      const { value } = event.target;

      const valueFloat = parseFloat(value);

      const valid =
        valueFloat >= 0 &&
        valueFloat <= 10 &&
        Math.floor(valueFloat) === valueFloat;

      setIsValid(valid);

      if (valid) onChange(name, value);
    },
    [name, onChange]
  );

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} scoop`}
      />

      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: 10 }}
      >
        <Form.Label column xs={6} style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>

        <Col xs={5} style={{ textAlign: 'left' }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

ScoopOption.propTypes = {
  name: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(ScoopOption);
