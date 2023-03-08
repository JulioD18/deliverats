import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { expressjwt: jwt } = require("express-jwt");
import jwksRsa from "jwks-rsa";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`,
  }),

  audience: `https://${domain}/api/v2/`,
  issuer: `https://${domain}/`,
  algorithms: ["RS256"],
});
