import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { TweetPrompt } from "./components/TweetPrompt";
import NavBar from "./components/NavBar";
import { LoginBox } from "./components/LoginBox";
import { LeftSideBar } from "./components/LeftSideBar";

type Props = {
  pca: PublicClientApplication,
}

function App({ pca }: Props) {
  return (
    <MsalProvider instance={pca}>
      <NavBar />
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-x-4 mt-4">
          <div className="col-span-2">
            <LeftSideBar />
          </div>
          <div className="col-span-7">
            <TweetPrompt />
          </div>
          <div className="col-span-3 bg-sky-200 rounded-md">
            <LoginBox />
          </div>
        </div>
      </div>
    </MsalProvider>
  )
}

export default App;
