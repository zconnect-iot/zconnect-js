const endpoints = {
  login: {
    url: 'api/v3/login/',
    method: 'POST',
    token: false,
    cache: 0,
  },
  register: {
    url: 'api/v3/signup/',
    method: 'POST',
    token: false,
    cache: 0,
  },
  resetPassword: {
    url: 'api/v3/reset_password/',
    method: 'POST',
    token: false,
    cache: 0,
  },
}

export default endpoints
