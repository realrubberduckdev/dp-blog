import { graphql, StaticQuery } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import * as React from 'react';
import styled from '@emotion/styled';

import config from '../../website-config';

const SubscribeOverlayLogo = styled.img`
  position: fixed;
  top: 23px;
  left: 30px;
  height: 30px;
`;

interface SiteNavLogoProps {
  logo?: {
    childImageSharp: {
      gatsbyImageData: any;
    };
  };
}

const SubscribeLogo = () => (
  <StaticQuery
    query={graphql`
      query SubscribeOverlayLogo {
        logo: file(relativePath: { eq: "img/rubber-duck-logo.png" }) {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            gatsbyImageData(width: 200, placeholder: BLURRED)
          }
        }
      }
    `}
    // tslint:disable-next-line:react-this-binding-issue
    render={(data: SiteNavLogoProps) => {
      if (data.logo) {
        const image = getImage(data.logo);
        const imageSrc = image?.images?.fallback?.src || '';
        return imageSrc ? <SubscribeOverlayLogo src={imageSrc} alt={config.title} /> : null;
      }
      return null;
    }}
  />
);

export default SubscribeLogo;
