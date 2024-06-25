import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import LinkButton from '../LinkButton';
import { IPublicClientApplication } from '@azure/msal-browser';

const loginRedirect = async (instance: IPublicClientApplication) => {
  await instance.loginRedirect();
};

const signOut = (instance: IPublicClientApplication) =>
  instance.logoutRedirect();

export const LoginBox = () => {
  const { instance } = useMsal();
  const username =
    (instance.getActiveAccount()?.idTokenClaims?.given_name as string) ||
    'null';

  return (
    <div className="bg-sky-200 rounded-md pb-3">
      <UnauthenticatedTemplate>
        <p className="pl-3 pt-3">
          <LinkButton onClick={async () => await loginRedirect(instance)}>
            Sign Up or Sign In
          </LinkButton>
        </p>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <div className="flex flex-row">
          <div className="avatar placeholder pl-3 pt-3">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
              <span className="text-xl">{username[0].toLowerCase()}</span>
            </div>
          </div>
          <div>
            <p className="pl-3 pt-3">Hello, {username}!</p>
            <p className="pl-3 text-xs">
              Not you?{' '}
              <LinkButton onClick={() => signOut(instance)}>
                Sign Out
              </LinkButton>
            </p>
          </div>
        </div>
      </AuthenticatedTemplate>
    </div>
  );
};
