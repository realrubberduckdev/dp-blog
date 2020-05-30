// This file is for Gatsby Server Rendering APIs.
// Refer https://www.gatsbyjs.org/docs/ssr-apis/ for detailed documentation.

const React = require("react");

// The gatsby-ssr.js is gatsby server side rendering script.
// The onRenderBody is triggered after body is rendered then it adds the script below.
// For details refer: https://eshlox.net/2019/11/30/add-buy-me-a-coffee-widget-to-a-gatsbyjs-site
export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
      data-name="BMC-Widget"
      src="https://cdn.buymeacoffee.com/widget/1.0.0/prod/widget.prod.min.js"
      data-id="rubberduck"
      data-description="Support me on Buy me a coffee!"
      data-message="Thank you for visiting. Feel free to buy me a coffee!"
      data-color="#FF813F"
      data-position="right"
      data-x_margin="28"
      data-y_margin="18"
    ></script>
  ]);
};