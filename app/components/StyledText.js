import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import { colors } from '../config';

const StyledText = styled.Text`
  color: ${(props) => (props.link ? colors.green : colors.black)};
  font-weight: 400;
`;

StyledText.propTypes = {
  link: PropTypes.bool
};

export default StyledText;
