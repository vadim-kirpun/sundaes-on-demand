import { memo } from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AlertBanner = ({ message, variant }) => (
  <Alert variant={variant}>{message}</Alert>
);

AlertBanner.propTypes = {
  message: PropTypes.string,
  variant: PropTypes.string,
};

AlertBanner.defaultProps = {
  message: 'An unexpected error occurred. Please try again later.',
  variant: 'danger',
};

export default memo(AlertBanner);
