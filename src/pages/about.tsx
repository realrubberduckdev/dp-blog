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
                Software Engineer with passion for agile practices, DevOps, Microsoft technologies and all things Azure.
                Currently learning Gatsby, Node.js and React.js. Hence this blog.

                You can check my linkedin profile <a href='https://www.linkedin.com/in/dpriyadarshee/' target="_blank">here</a>.

                <br/><br/>
                <center>
                <table cellspacing="0" cellpadding="0">
                  <tr>
                    <th colSpan="4">
                      <center>Certifications</center>
                    </th>
                  </tr>
                  <tr>
                    <td><YourClaimBadge badgeId='97ad8520-7195-46f5-8cfd-283c150e9057' /></td>
                    <td><YourClaimBadge badgeId='1505e021-7708-4596-9ac9-87cd05ba927d' /></td>
                    <td><YourClaimBadge badgeId='0623b8c3-d7e0-421f-b137-ee2f613dbdb4' /></td>
                    <td><YourClaimBadge badgeId='e73e350b-d77e-402a-9575-6e37d4921e8f' /></td>
                    <td>
                      <a href='https://www.dropbox.com/s/id2arl0ud63r464/ScrumMaster_DP_ScrumAlliance_CSM_Certificate.pdf' target="_blank">
                        <img src="https://www.avantastech.com/wp-content/uploads/2019/12/csm-certified-scrum-alliance.png"
                          alt="Certified Scrum Master" width="150" height="70" />
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
