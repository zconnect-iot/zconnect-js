# Auth Usage

Only the auth and api sagas require configuration with dependencies so everything else can be imported from the zc-core module directly e.g.

```
import { requestLogin } from 'zc-core/src/auth/actions'
import { selectAuthAPIState } from 'zc-core/src/auth/selectors'
```


### Logging in
```
import { * as authActions } from 'zc-core/src/auth/actions'
...
const mapDispatchToProps = dispatch => ({
  loginUser: (email, pass) => dispatch(authActions.requestLogin(email, pass)),
})
```
Triggering actions after logging in user
```
import { LOGIN_USER } from 'zc-core/src/auth/constants'
...
const loggedInSaga = () => {
 function* worker() {
    // Some action
 }
 function* watcher() {
   yield takeLatest(LOGIN_USER, worker)
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

Errors are converted to simple objects and put in the store. It's possible to put any data you want in `auth.error` by dispatching the relevant error action creator. The specific error to display can be derived from this data using selectors. `APIError`'s include the server response and json (if any).

### Validation

No validation is carred out by the sagas. This needs to be done in the app though it could be added. Would need to ensure the validation errors are compatible with all apps i.e. not tied to translation string keys such as in novo-mobile-apps
