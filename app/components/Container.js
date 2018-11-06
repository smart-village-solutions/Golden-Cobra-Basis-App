import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';
import { colors } from '../config';

const Container = styled.View`
  background-color: ${(props) => props.backgroundColor};
  flex: 1;
  ${(props) =>
    props.centered &&
    css`
      align-items: center;
      justify-content: center;
      padding: 15px;
    `};
`;

Container.propTypes = {
  backgroundColor: PropTypes.string,
  centered: PropTypes.bool
};

Container.defaultProps = {
  backgroundColor: colors.lighterGray
};

export default Container;
