import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import { SiteHeader, outer, inner, SiteMain } from '../styles/shared';
import * as React from 'react';
import { css } from '@emotion/core';

import { PostFullHeader, PostFullTitle, NoImage, PostFull } from '../templates/post';
import { PostFullContent } from '../components/PostContent';
import Footer from '../components/Footer';
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
                Software Engineer with passion for Agile Practices, DevOps, Microsoft Technologies and all things Azure.
                Currently learning Gatsby, Node.js and React.js. Hence this blog.

              <br></br><br></br>
              <h6>Recent certifications</h6>
              <a href='https://www.dropbox.com/s/id2arl0ud63r464/ScrumMaster_DP_ScrumAlliance_CSM_Certificate.pdf' target="_blank">
                Certified Scrum Master
              </a><br></br>

              <a href='https://www.youracclaim.com/badges/e73e350b-d77e-402a-9575-6e37d4921e8f/public_url' target="_blank">
                Exam 483: Programming in C#
              </a><br></br>

              <a href='https://www.youracclaim.com/badges/0623b8c3-d7e0-421f-b137-ee2f613dbdb4/public_url' target="_blank">
                Exam AZ900: Microsoft Certified: Azure Fundamentals
              </a><br></br>

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
