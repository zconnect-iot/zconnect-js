const endpoints = {
  login: {
    url: 'api/v1/users/login',
    method: 'POST',
    token: false,
    cache: 0,
  },
  register: {
    url: 'api/v1/users/signup',
    method: 'POST',
    token: false,
    cache: 0,
  },
  resetPassword: {
    url: 'api/v1/users/reset_password',
    method: 'POST',
    token: false,
    cache: 0,
  },
}

export default endpoints
