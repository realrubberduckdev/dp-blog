import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import { SiteHeader, outer, inner, SiteMain } from '../styles/shared';
import * as React from 'react';
import { css } from '@emotion/react';

import { PostFullHeader, PostFullTitle, NoImage, PostFull } from '../templates/post';
import { PostFullContent } from '../components/PostContent';
import Footer from '../components/Footer';
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
                I enjoy public speaking and am constantly trying to improve on it. Few of the topics
                I have spoken on are listed below. If you'd like me to speak at any event, I would
                be honoured to do so, so please do get in touch. And if you have an interesting talk
                or event happening, do let me know, I will try to join in to listen.
                <br />
                <br />
                <h2>2023</h2>
                <ul>
                  <li>
                    <a href="https://www.fujitsu.com/global/services/multi-cloud/cloud-services/springboard/" target="_blank">
                      How to use Fujitsu Springboard™ for Microsoft Azure
                    </a>
                  </li>
                  <li>
                    <a href="https://docs.google.com/presentation/d/17MpWDYMgnIdHShm8EaQbQdl9BtHQ830o/edit?usp=drivesdk&ouid=112397321672624446636&rtpof=true&sd=true" target="_blank">
                      Introduction to DevOps
                    </a>
                  </li>
                </ul>
                <h2>2022</h2>
                <ul>
                  <li>
                    <a href="https://youtu.be/TfKHFMf59wQ" target="_blank">
                      Festive Tech Calendar - How to design networking architecture for migration onto Azure
                    </a>
                  </li>
                  <li>
                    <a href="https://docs.google.com/presentation/d/17MpWDYMgnIdHShm8EaQbQdl9BtHQ830o/edit?usp=drivesdk&ouid=112397321672624446636&rtpof=true&sd=true" target="_blank">
                      Introduction to DevOps
                    </a>
                  </li>
                </ul>
                <h2>2021</h2>
                <ul>
                  <li>
                    <a href="https://youtu.be/EqSNAFEUu-M" target="_blank">
                      Festive Tech Calendar - Features of an ideal IaC language
                    </a>
                  </li>
                  <li>
                    <a href="https://youtu.be/gLyq9hQbacM?t=13890" target="_blank">
                      AzConf 2021 - How to deploy and maintain financial software estate on Azure
                    </a>
                  </li>
                  <li>
                    <a href="https://youtu.be/YfGn4rjPi3c" target="_blank">
                      .Net Cambridge - How to deploy and maintain financial software estate on Azure
                    </a>
                  </li>
                  <li>
                    <a href="https://unhandledexceptionpodcast.com/posts/0013-devopswithdushyant/" target="_blank">
                      The Unhandled Exception Podcast - Episode 13: DevOps with Dushyant
                    </a>
                  </li>
                </ul>
                <h2>2020</h2>
                <ul>
                  <li>
                    <a href="https://youtu.be/PbS_lQQ1dnE" target="_blank">
                      Static analysis of Terraform code for Azure resources
                    </a>
                  </li>
                  <li>
                    <a href="https://youtu.be/SnBcZGgOq8Q" target="_blank">
                      AzConf Dev - How to automate network security for your Azure functions
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.meetup.com/dotnetsouthwest/events/273278637"
                      target="_blank"
                    >
                      Xamarin &amp; Admob, monetizing an android app
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://youtu.be/WQQkVHXBle8"
                      target="_blank"
                    >
                      .Net Cambridge - Network Security for Azure functions
                    </a>
                  </li>
                </ul>
                <h2>2019</h2>
                <ul>
                  <li>
                    <a
                      href="https://www.dotnetoxford.com/posts/2020-05-lightning-talks"
                      target="_blank"
                    >
                      NuGet &amp; MSBuild
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://drive.google.com/file/d/1eRu9I70JAVvbySm0RWVtVz-W4dsYYe0U/view?usp=sharing"
                      target="_blank"
                    >
                      Converting MediaWiki to MD
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://drive.google.com/file/d/1Y-u148V2CH9-wEwJ7utoYVXPknzjdlXR/view?usp=sharing"
                      target="_blank"
                    >
                      Microsoft Certification
                    </a>
                  </li>
                  <li>
                    <a href="https://azureadventcalendar.com/" target="_blank">
                      Azure Advent Calendar 2019: Azure DevOps flaky test identification &amp;
                      reporting
                    </a>
                  </li>
                  <li>
                    <a href="https://www.meetup.com/devopsoxford/events/264188223/" target="_blank">
                      Practicing DevOps with Azure DevOps
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.dotnetoxford.com/posts/2019-05-lightning-talks"
                      target="_blank"
                    >
                      Writing custom Azure DevOps extensions
                    </a>
                  </li>
                </ul>
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
