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
import EmbeddedCredential from '../components/MsCertBadge';
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
                      <td>
                        <EmbeddedCredential
                          certificateId="AB6050AA7FB3F9C7"
                          certificateName="Microsoft Certified: Azure Network Engineer Associate"
                          certificateImgUrl="https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-associate-badge.svg" />
                      </td>

                      <td>
                        <EmbeddedCredential
                          certificateId="SECENG2025"
                          certificateName="Microsoft Certified: Azure Security Engineer Associate"
                          certificateImgUrl="https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-associate-badge.svg" />
                      </td>

                      <td>
                        <EmbeddedCredential
                          certificateId="DEVASSOC2026"
                          certificateName="Microsoft Certified: Azure Developer Associate"
                          certificateImgUrl="https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-associate-badge.svg" />
                      </td>

                      <td>
                        <EmbeddedCredential
                          certificateId="DEVOPS2026"
                          certificateName="Microsoft Certified: DevOps Engineer Expert"
                          certificateImgUrl="https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-expert-badge.svg" />
                      </td>

                      <td>
                        <EmbeddedCredential
                          certificateId="SOLARCH2026"
                          certificateName="Microsoft Certified: Azure Solutions Architect Expert"
                          certificateImgUrl="https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-expert-badge.svg" />
                      </td>

                      <td>
                        <EmbeddedCredential
                          certificateId="AZFUN2019"
                          certificateName="Microsoft Certified: Azure Fundamentals"
                          certificateImgUrl="https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <EmbeddedCredential
                          certificateId="CSPROG2015"
                          certificateName="Microsoft Specialist: Programming in C#"
                          certificateImgUrl="https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-specialist-badge.svg" />
                      </td>

                      <td>
                        <EmbeddedCredential
                          certificateId="MCPRO2015"
                          certificateName="Microsoft Certified Professional"
                          certificateImgUrl="https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-professional-badge.svg" />
                      </td>

                      <td>
                        <EmbeddedCredential
                          certificateId="DEVLEGACY2020"
                          certificateName="Microsoft Certified: Azure Developer Associate (Legacy)"
                          certificateImgUrl="https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-associate-badge.svg" />
                      </td>

                      <td><YourClaimBadge badgeId='9400517c-4b45-41ee-be94-757bb0241cc3' /></td>
                      <td><YourClaimBadge badgeId='aa2705f7-f843-4156-92ab-8cbdbd180265' /></td>
                      <td>
                        <a href='https://raw.githubusercontent.com/realrubberduckdev/dp-blog/main/src/content/img/badges/aws-partner-accreditation.png' target="_blank">
                          <img src="https://raw.githubusercontent.com/realrubberduckdev/dp-blog/main/src/content/img/badges/aws-partner-accreditation2.png"
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
                          <img src="https://raw.githubusercontent.com/realrubberduckdev/dp-blog/main/src/content/img/badges/csm.png"
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
