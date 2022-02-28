import { memo, useCallback, useState } from 'react';
import { Form, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SummaryForm = ({ setOrderPhase }) => {
  const [isChecked, setIsChecked] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to{' '}
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  const onChange = (e) => setIsChecked(e.target.checked);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setOrderPhase('completed');
    },
    [setOrderPhase]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          label={checkboxLabel}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!isChecked}>
        Confirm order
      </Button>
    </Form>
  );
};

SummaryForm.propTypes = {
  setOrderPhase: PropTypes.func.isRequired,
};

export default memo(SummaryForm);
