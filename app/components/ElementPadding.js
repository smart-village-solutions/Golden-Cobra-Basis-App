import PropTypes from 'prop-types';
import styled from 'styled-components';

const ElementPadding = styled.View`
  padding-horizontal: ${(props) => props.horizontal}px;
  padding-vertical: ${(props) => props.vertical}px;
`;

ElementPadding.propTypes = {
  horizontal: PropTypes.number,
  vertical: PropTypes.number
};

ElementPadding.defaultProps = {
  horizontal: 0,
  vertical: 0
};

export default ElementPadding;
