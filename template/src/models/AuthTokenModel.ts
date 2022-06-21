type AuthTokenModel = {
  accessToken: string;
  refreshToken: string;
};

export default AuthTokenModel;

export function getAuthTokenData(dataJson: any) {
  const accessToken = dataJson?.token;
  const refreshToken = dataJson?.refresh_token || "";
  if (accessToken) {
    const item: AuthTokenModel = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    return item;
  }
  return undefined;
}
