import recaptcha from "recaptcha-validator";

import createResolver from "lib/createResolver";

export default createResolver(
  async (parent, { "g-recaptcha-response": response }, { ip }) => {
    await recaptcha(process.env.RECAPTCHA_SITE_SECRET, response, ip).catch(
      err => {
        if (typeof err === "string")
          throw new Error(`Recaptcha request failed: ${err}`);
        throw err;
      }
    );
  }
);
