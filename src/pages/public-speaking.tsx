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

const PublicSpeaking: React.FC = () => (
  <IndexLayout>
    <Helmet>
      <title>Public speaking</title>
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
            <PostFullTitle>Public Speaking</PostFullTitle>
          </PostFullHeader>

          <PostFullContent className="post-full-content">
            <div className="post-content">
              <p>
              I enjoy public speaking and am constantly trying to improve on it. There are a few topics I have spoken on, which are listed below. If you'd like me to speak at any event, I would be honoured to do so, so please do get in touch. And if you have an interesting talk or event happening, do let me know, I will try join in to listen.
              
                <br/><br/>
                <center>
                <table cellspacing="0" cellpadding="0">
                  <tr>
                    <th colSpan="5">
                      <center>Talks and presentations</center>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <a href="https://www.dotnetoxford.com/posts/2020-05-lightning-talks" target="_blank">
                      NuGet and MSBuild
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="https://drive.google.com/file/d/1eRu9I70JAVvbySm0RWVtVz-W4dsYYe0U/view?usp=sharing" target="_blank">
                      CONVERTING MEDIAWIKI TO MD
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="https://drive.google.com/file/d/1Y-u148V2CH9-wEwJ7utoYVXPknzjdlXR/view?usp=sharing" target="_blank">
                      MICROSOFT CERTIFICATION
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="https://www.meetup.com/devopsoxford/events/264188223/" target="_blank">
                      Practicing DevOps with Azure DevOps
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="https://www.dotnetoxford.com/posts/2019-05-lightning-talks" target="_blank">
                        Writing custom Azure DevOps extensions
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

export default PublicSpeaking;
