# Auth Usage

Only the auth and api sagas require configuration with dependencies so everything else can be imported from the zc-core module directly e.g.

```
import { requestLogin } from 'zc-core/src/auth/actions'
import { selectAuthAPIState } from 'zc-core/src/auth/selectors'
```

The auth API state is handled by the `apiRequest` saga so the api selectors can be used in the same way to get this data e.g. `selectAPIState(state, { endpoint: 'login' })`. The auth endpoints are defined [here](./src/auth/endpoints.js) and use endpoint keys `login`, `register` and `resetPassword`.

This module exports actions and selectors that wrap the underlying api actions and selectors and include the releavnt key to simplify things.

### Logging in
```
import { login } from 'zc-core/src/auth/actions'
...
const mapDispatchToProps = dispatch => ({
  loginUser: (email, pass) => dispatch(login(email, pass)),
})
```
Triggering actions after logging in user
```
import { LOGIN_SUCCESS } from 'zc-core/src/auth/constants'
...
const loggedInSaga = () => {
 function* worker() {
    // Some action
 }
 function* watcher() {
   yield takeLatest(LOGIN_SUCCESS, worker)
 }
}
```
```
// Root saga

export default [
  ...
  loggedInSaga().watcher,
]
```
Selecting User Login state
```
import { selectUserLoggedIn } from 'zc-core/src/auth/selectors'

const mapStateToProps = state => ({
  loggedIn: selectUserLoggedIn(state),
})
```

### Logout

```
import { * as authActions } from 'zc-core/src/auth/actions'
...
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
})
```

### Errors

Errors are converted to simple objects and put in the store at `api.{ endpoint, params }.errorObject`. It's possible to put any data you want here by dispatching the relevant error action creator. The specific error to display can be derived from this data using selectors. `APIError`'s include the server response and json (if any).

Auth exports `selectLoginError`, `selectRegisterError`, `selectResetPasswordError` to aid getting the relevant error though this is just wrapping the `selectAPIState` selector and including the relevant endpoint key for you.

### Validation

No validation is carried out by the sagas. This needs to be done in the app though it could be added. Would need to ensure the validation errors are compatible with all apps i.e. not tied to translation string keys such as in novo-mobile-apps

For now, validation errors can be added to the store by dispatching `REQUEST_ERROR` actions with the endpoint specified in the meta and helper functions are included that do this for you e.g.

```
import { loginError } from 'zc-core/auth/actions'

const mapDispatchToProps = dispatch => ({
  ...
  registerLoginError: error => dispatch(loginError(error)),
})
```

Selecting the error details can be achieved in 2 ways:

1. Using the `selectLoginError`, `selectRegisterError` or `selectResetPasswordError` selectors and writing your own selectors to drill down into the object to determine the error to display
2. Using any of the api selectors and passing the relevant `endpoint` key e.g.

```
import { createSelector } from 'reselect'
import {
  selectErrorTitle,
  selectErrorDescription,
  selectErrorResponseTitle,
  selectErrorResponseDescription,
  selectErrorResponseStatus,
} from 'zc-core/api/selectors'


export const selectErrorDetails = createSelector(
  selectErrorResponseStatus,
  selectErrorTitle,
  selectErrorDescription,
  selectErrorResponseTitle,
  selectErrorResponseDescription,
  (status, title, description, jsonTitle, jsonDescription) => {
    if (jsonDescription === 'User has not confirmed their email') return 'LoginForm.emailconfirm'
    if (jsonDescription === 'Error creating new user: The email provided is already in use') return 'RegisterForm.emailinuse'
    if (status === 404 || status === 403) return 'LoginForm.invalid'
    if (title || description) return description || title
    return 'Error.tryagain'
  },
)
```
