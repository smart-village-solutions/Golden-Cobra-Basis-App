import styled, { css } from 'styled-components/native';

/**
 * Not sure if this is really a good solution for generalizing
 */
const IconWrapper = styled.View`
  ${(props) =>
    props.left
      ? css`
          width: 30;
        `
      : props.right &&
        css`
          align-items: flex-end;
          flex-grow: 1;
        `};
`;

const requiredPropsCheck = (props, propName, componentName) => {
  if (props.left && props.right) {
    return new Error(`Only one of 'left' or 'right' is required by '${componentName}' component.`);
  }
};

IconWrapper.propTypes = {
  left: requiredPropsCheck,
  right: requiredPropsCheck
};

export default IconWrapper;
