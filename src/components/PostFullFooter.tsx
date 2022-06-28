import * as React from 'react';
import styled from '@emotion/styled';

const PostFullFoot = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 3vw 0 6vw 0;
  max-width: 840px;
`;

interface PostFullFooterProps {
  children: React.ReactNode;
}

const PostFullFooter: React.FC<PostFullFooterProps> = (props) => (
  <PostFullFoot>{props.children}</PostFullFoot>
);

export default PostFullFooter;
