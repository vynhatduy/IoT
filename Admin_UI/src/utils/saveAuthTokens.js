export const saveAuthTokens = (accessToken, refreshToken, role) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("role", role);
};
