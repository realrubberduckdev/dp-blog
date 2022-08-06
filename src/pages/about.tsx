import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import { SiteHeader, outer, inner, SiteMain } from '../styles/shared';
import * as React from 'react';
import { css } from '@emotion/core';

import { PostFullHeader, PostFullTitle, NoImage, PostFull } from '../templates/post';
import { PostFullContent } from '../components/PostContent';
import Footer from '../components/Footer';
import YourClaimBadge from '../components/YourAcclaimBadge';
import Helmet from 'react-helmet';

const PageTemplate = css`
  .site-main {
    background: #fff;
    padding-bottom: 4vw;
  }

  img {
    display: block;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
  }
}
`;

const About: React.FC = () => (
  <IndexLayout>
    <Helmet>
      <title>About</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <header css={[outer, SiteHeader]}>
        <div css={inner}>
          <SiteNav />
        </div>
      </header>
      <main id="site-main" className="site-main" css={[SiteMain, outer]}>
        <article className="post page" css={[PostFull, NoImage]}>
          <PostFullHeader>
            <PostFullTitle>Dushyant Priyadarshee</PostFullTitle>
          </PostFullHeader>

          <PostFullContent className="post-full-content">
            <div className="post-content">
              <p>
                Hi I am Dushyant Priyadarshee.
                Software Engineer with passion for agile practices, cloud , DevOps, Microsoft technologies and all things Azure.
                Now diving into other clouds such as AWS and Digital Ocean.

                You can check my linkedin profile <a href='https://www.linkedin.com/in/dpriyadarshee/' target="_blank">here</a>.

                <br /><br />
                <center>
                  <table cellspacing="0" cellpadding="0">
                    <tr>
                      <th colSpan="6">
                        <center>Certifications</center>
                      </th>
                    </tr>
                    <tr>
                      <td><YourClaimBadge badgeId='5c12b822-23e2-48ce-a8a8-ee9b3dfd0533' /></td>
                      <td><YourClaimBadge badgeId='2dad0827-43f8-4560-92c8-fa6a1870964e' /></td>
                      <td><YourClaimBadge badgeId='1f7c1fd6-d4d8-4e14-9c95-88ea1da97bff' /></td>
                      <td><YourClaimBadge badgeId='029c4b06-604b-4ddb-a74a-fc4b137a9751' /></td>
                      <td><YourClaimBadge badgeId='f563d775-b613-45af-8737-ae54364b7776' /></td>
                      <td><YourClaimBadge badgeId='a0d71cdd-ac11-4067-b12f-7afbac1cef61' /></td>
                    </tr>
                    <tr>
                      <td><YourClaimBadge badgeId='5cb8bd57-d88f-477d-bb53-4a43d842bc95' /></td>
                      <td><YourClaimBadge badgeId='87f1fddf-1bd3-4c18-b85b-496e53e47dc4' /></td>
                      <td><YourClaimBadge badgeId='62c4e27d-759a-4673-b757-31e57826a30b' /></td>
                      <td><YourClaimBadge badgeId='9400517c-4b45-41ee-be94-757bb0241cc3' /></td>
                      <td><YourClaimBadge badgeId='aa2705f7-f843-4156-92ab-8cbdbd180265' /></td>
                      <td>
                        <a href='https://raw.githubusercontent.com/realrubberduckdev/dp-blog/badge-updates/src/content/img/badges/aws-partner-accreditation.png' target="_blank">
                          <img src="https://raw.githubusercontent.com/realrubberduckdev/dp-blog/badge-updates/src/content/img/badges/aws-partner-accreditation2.png"
                            alt="AWS Partner: Accreditation (Technical)(Classroom)" width="75" height="100" />
                          <center>
                            AWS (Technical)
                          </center>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <center>
                          <a href='https://badge.azconf.dev/badge/ef5e192c-bd66-4004-900f-725e6bfdd1d0' target="_blank">
                            <img src="https://azconfdev.blob.core.windows.net/azbadges/speaker.png"
                              alt="Speaker: Azure Community Conference 2021" width="100" height="100" />
                            AzConf 2021
                          </a>
                        </center>
                      </td>
                      <td>
                        <a href='https://www.dropbox.com/s/id2arl0ud63r464/ScrumMaster_DP_ScrumAlliance_CSM_Certificate.pdf' target="_blank">
                          <img src="https://raw.githubusercontent.com/realrubberduckdev/dp-blog/badge-updates/src/content/img/badges/csm.png"
                            alt="Certified Scrum Master" width="100" height="100" />
                          Certified Scrum Master
                        </a>
                      </td>
                    </tr>
                  </table>
                </center>
              </p>
            </div>
          </PostFullContent>
        </article>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default About;
