const endpoints = {
  login: {
    url: 'api/v3/auth/login/',
    method: 'POST',
    token: false,
    cache: 0,
  },
  register: {
    url: 'api/v3/auth/signup/',
    method: 'POST',
    token: false,
    cache: 0,
  },
  resetPassword: {
    url: 'api/v3/auth/password/reset/',
    method: 'POST',
    token: false,
    cache: 0,
  },
  resetPasswordConfirm: {
    url: 'api/v3/auth/password/reset/confirm/',
    method: 'POST',
    token: false,
    cache: 0,
  },
}

export default endpoints
