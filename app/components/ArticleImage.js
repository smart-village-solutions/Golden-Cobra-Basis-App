import PropTypes from 'prop-types';
import styled from 'styled-components';

const ArticleImage = styled.Image`
  flex: 1;
  height: ${(props) => props.height};
`;

ArticleImage.propTypes = {
  height: PropTypes.number.isRequired
};

export default ArticleImage;
