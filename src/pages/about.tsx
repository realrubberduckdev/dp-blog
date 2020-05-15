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

              <br></br><br></br>
              <h6>Certifications</h6>
              <a href='https://www.dropbox.com/s/id2arl0ud63r464/ScrumMaster_DP_ScrumAlliance_CSM_Certificate.pdf' target="_blank">
                Certified Scrum Master
              </a><br></br>
              <YourClaimBadge badgeId='1505e021-7708-4596-9ac9-87cd05ba927d' />
              <YourClaimBadge badgeId='0623b8c3-d7e0-421f-b137-ee2f613dbdb4' />
              <YourClaimBadge badgeId='e73e350b-d77e-402a-9575-6e37d4921e8f' />
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
