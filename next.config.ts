// next.config.mjs

import autoCert from "anchor-pki/auto-cert/integrations/next";

const withAutoCert = autoCert({
  enabledEnv: "development",
});

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};


const nextConfig = {};

export default withAutoCert(nextConfig);