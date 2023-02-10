export function getRequestUrl() {
  return process.env.REACT_APP_CURRENT_ENV === 'local' ? process.env.REACT_APP_REQUEST_API_URL : window.location.origin;
}

export const getAuthToken = () => localStorage.getItem('login_access_token');