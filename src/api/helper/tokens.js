const storage = window.localStorage;

function setTokensData(token, expires) {
  storage.setItem("token", token);
}

function getAccessToken() {
  const token = storage.getItem("token");
  if (isTokenExpired()) return null;
  return token;
}

function isTokenExpired() {
  const token = storage.getItem("token");
}

function cleanTokensData() {
  storage.removeItem("token");
  
}

export { setTokensData, getAccessToken, cleanTokensData, isTokenExpired };
