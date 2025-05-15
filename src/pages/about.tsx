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
                I am Dushyant Priyadarshee.
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
                          certificateId="SOLARCH2026"
                          certificateImgAltText="Microsoft Certified: Azure Solutions Architect Expert"
                          certificateImgUrl="https://images.credly.com/size/340x340/images/987adb7e-49be-4e24-b67e-55986bd3fe66/azure-solutions-architect-expert-600x600.png" />
                      </td>

                      <td>
                        <EmbeddedCredential
                          certificateId="SECENG2025"
                          certificateImgAltText="Microsoft Certified: Azure Security Engineer Associate"
                          certificateImgUrl="https://images.credly.com/size/340x340/images/1ad16b6f-2c71-4a2e-ae74-ec69c4766039/azure-security-engineer-associate600x600.png" />
                      </td>

                      <td>
                        <EmbeddedCredential
                          certificateId="DEVOPS2026"
                          certificateImgAltText="Microsoft Certified: DevOps Engineer Expert"
                          certificateImgUrl="https://images.credly.com/size/340x340/images/c3ab66f8-5d59-4afa-a6c2-0ba30a1989ca/CERT-Expert-DevOps-Engineer-600x600.png" />
                      </td>


                      <td>
                        <EmbeddedCredential
                          certificateId="AB6050AA7FB3F9C7"
                          certificateImgAltText="Microsoft Certified: Azure Network Engineer Associate"
                          certificateImgUrl="https://images.credly.com/size/340x340/images/c3a2e51d-7984-48cc-a4cb-88d4e8487037/azure-network-engineer-associate-600x600.png" />
                      </td>


                      <td>
                        <EmbeddedCredential
                          certificateId="DEVASSOC2026"
                          certificateImgAltText="Microsoft Certified: Azure Developer Associate"
                          certificateImgUrl="https://images.credly.com/size/340x340/images/63316b60-f62d-4e51-aacc-c23cb850089c/azure-developer-associate-600x600.png" />
                      </td>

                      <td>
                        <EmbeddedCredential
                          certificateId="DEVLEGACY2020"
                          certificateName="(Legacy)"
                          certificateImgAltText="Microsoft Certified: Azure Developer Associate (Legacy)"
                          certificateImgUrl="https://images.credly.com/size/340x340/images/92e0618b-8002-4868-9e88-794a33aeb3b5/azure-developer-associate-600x600.png" />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <EmbeddedCredential
                          certificateId="AZFUN2019"
                          certificateImgAltText="Microsoft Certified: Azure Fundamentals"
                          certificateImgUrl="https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png" />
                      </td>

                      <td>
                        <EmbeddedCredential
                          certificateId="CSPROG2015"
                          certificateImgAltText="Microsoft Specialist: Programming in C#"
                          certificateImgUrl="https://images.credly.com/size/340x340/images/78e39333-d0db-4931-b231-13bdb37040cc/Programming_in_C_23-01.png" />
                      </td>

                      <td>
                        <EmbeddedCredential
                          certificateId="MCPRO2015"
                          certificateName="Microsoft Certified Professional"
                          certificateImgAltText="Microsoft Certified Professional"
                          certificateImgUrl="https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-general-badge.svg" />
                      </td>
                      <td>
                        <a href='https://raw.githubusercontent.com/realrubberduckdev/dp-blog/main/src/content/img/badges/aws-partner-accreditation.png' target="_blank">
                          <img src="https://raw.githubusercontent.com/realrubberduckdev/dp-blog/main/src/content/img/badges/aws-partner-accreditation2.png"
                            alt="AWS Partner: Accreditation (Technical)(Classroom)" width="75" height="100" />
                          <center>
                            AWS (Technical)
                          </center>
                        </a>
                      </td>
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
