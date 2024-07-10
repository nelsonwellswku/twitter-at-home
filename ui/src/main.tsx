import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  PublicClientApplication,
  EventType,
  EventMessage,
  AuthenticationResult,
} from '@azure/msal-browser';
import { msalConfig } from './authConfig';
import appConfig from './appConfig';
import App from './App';
import './index.css';

const msalInstance = new PublicClientApplication(msalConfig);
msalInstance.initialize().then(() => {
  // Default to using the first account if no account is active on page load
  if (
    !msalInstance.getActiveAccount() &&
    msalInstance.getAllAccounts().length > 0
  ) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  }

  // This will update account state if a user signs in from another tab or window
  msalInstance.enableAccountStorageEvents();

  msalInstance.addEventCallback((event: EventMessage) => {
    const isSuccessfulLoginEvent =
      event.eventType === EventType.LOGIN_SUCCESS ||
      event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
      event.eventType === EventType.SSO_SILENT_SUCCESS;

    if (isSuccessfulLoginEvent) {
      const payload = event.payload as AuthenticationResult;

      if (payload && payload.account) {
        const account = payload.account;
        msalInstance.setActiveAccount(account);
      }
    }
  });

  const httpLink = createHttpLink({
    uri: appConfig.GRAPHQL_URI,
  });

  const authLink = setContext(async (_, { headers }) => {
    const activeAccount = msalInstance.getActiveAccount();
    if (!activeAccount) {
      return { ...headers };
    }
    const silentResponse = await msalInstance.acquireTokenSilent({
      account: activeAccount,
      scopes: [msalConfig.auth.clientId],
    });
    const token = silentResponse.accessToken;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : undefined,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Tweet: {
          keyFields: ['tweetId'],
        },
        User: {
          keyFields: ['userId'],
        },
      },
    }),
  });

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App pca={msalInstance} />
      </ApolloProvider>
    </React.StrictMode>,
  );
});
