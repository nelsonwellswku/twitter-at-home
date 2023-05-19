type WellKnownEndpointValues = {
  jwks_uri: string,
}

export const createResolver = (wellKnownEndpoint: string) => async (): Promise<string> => {
  const wellKnownEndpointValues = await fetch(wellKnownEndpoint).then(res => res.json());
  return (wellKnownEndpointValues as WellKnownEndpointValues).jwks_uri;
}
