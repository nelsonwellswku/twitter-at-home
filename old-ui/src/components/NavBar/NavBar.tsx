import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { msalConfiguration } from "../../config";
import Dropdown from "../DropDown";

type LinkButtonProps = {
  children: React.ReactNode,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
}

const LinkButton = (props: LinkButtonProps) => {
  const { onClick, children } = props;
  return <button className="cursor-pointer hover:underline" onClick={onClick}>{children}</button>;
}

const NavBar = () => {
  const { instance } = useMsal();
  const givenName: string = instance.getActiveAccount()?.idTokenClaims?.given_name as string;

  const signInClickHandler = () => {
    instance.loginRedirect();
  }

  const dropDownOptions = [{
    text: "Logout",
    onClick: () => instance.logoutRedirect({
      account: instance.getActiveAccount(),
      postLogoutRedirectUri: msalConfiguration.auth.postLogoutRedirectUri,
    })
  }]

  return <div className="grid grid-cols-12 bg-blue-300 mb-3 mt-3 rounded-md">
    <div className="col-span-5">
      <h1 className="text-3xl pb-1 ml-3">Twitter At Home 🏠</h1>
    </div>
    <div className="col-span-7 flex justify-end mr-4 pt-1">
      <UnauthenticatedTemplate>
        <LinkButton onClick={signInClickHandler}>Sign in or Sign Up</LinkButton>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <p className="text-xl">Welcome, {givenName}! </p>
        <Dropdown initialText={"⚙️"} options={dropDownOptions} />
      </AuthenticatedTemplate>
    </div>
  </div >;
};

export default NavBar;
