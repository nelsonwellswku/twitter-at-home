export const msalConfiguration = {
  "auth": {
    "authority": "https://octogami.b2clogin.com/octogami.onmicrosoft.com/B2C_1_octogami_signup_signin",
    "knownAuthorities": [
      "https://octogami.b2clogin.com"
    ],
    "clientId": "5c89ba85-8baa-4be5-a106-f13018cfd1c2",
    "navigateToLoginRequestUrl": true,
    "redirectUri": "http://localhost:3000/auth-login",
    "postLogoutRedirectUri": "http://localhost:3000/",
  }
};
