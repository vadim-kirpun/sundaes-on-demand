import { memo } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

const ScoopOption = ({ name, imagePath }) => (
  <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
    <img
      style={{ width: '75%' }}
      src={`http://localhost:3030${imagePath}`}
      alt={`${name} scoop`}
    />
  </Col>
);

ScoopOption.propTypes = {
  name: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
};

export default memo(ScoopOption);
