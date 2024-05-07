// AuthService.js
export const isLoggedIn = () => {
  const token = sessionStorage.getItem('jwtToken');
  // Check if token exists and is not expired
  return token ? true : false;
};
