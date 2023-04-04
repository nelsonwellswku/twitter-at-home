import { useMsal } from '@azure/msal-react';

const AuthLogin = () => {
  const { instance } = useMsal();
  instance.handleRedirectPromise();
  return null;
}

export default AuthLogin;
