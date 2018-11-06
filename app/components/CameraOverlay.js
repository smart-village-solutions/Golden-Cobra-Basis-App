import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';
import { colors } from '../config';

const CameraOverlay = styled.View`
  align-items: center;
  flex-direction: row;
  left: 0;
  padding: 16px;
  position: absolute;
  right: 0;
  ${(props) =>
    props.top
      ? css`
          flex: 1;
          top: 0;
          justify-content: space-between;
        `
      : props.bottom &&
        css`
          background-color: ${colors.cameraOverlay};
          bottom: 0;
          justify-content: center;
        `};
`;

const requiredPropsCheck = (props, propName, componentName) => {
  if (!props.top && !props.bottom) {
    return new Error(`One of 'top' or 'bottom' is required by '${componentName}' component.`);
  }
};

CameraOverlay.propTypes = {
  top: requiredPropsCheck,
  bottom: requiredPropsCheck
};

export default CameraOverlay;
