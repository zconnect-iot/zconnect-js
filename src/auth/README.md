# Auth Usage

### Logging in
```
import { authActions } from 'zc-core'
...
const mapDispatchToProps = dispatch => ({
  loginUser: (email, pass) => dispatch(authActions.requestLogin(email, pass)),
})
```
Triggering actions after logging in user
```
import { authConstants } from 'zc-core'
...
const loggedInSaga = () => {
 function* worker() {
    // Some action
 }
 function* watcher() {
   yield takeLatest(authConstants.LOGIN_USER, worker)
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
import { authSelectors } from 'zc-core'

const mapStateToProps = state => ({
  loggedIn: authSelectors.selectUserLoggedIn(state),
})
```

### Logout

```
import { authActions } from 'zc-core'
...
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
})
```

### Errors

Fetch errors are converted to simple objects and put in the store. The specific error to display can be derived from this data using selectors. An example is included in `authSelectors.selectErrorDetails` which looks at the json server response if available and returns an error translation key based on that. `APIError`'s include the server response and json (if any).

### Validation

No validation is carred out by the sagas. This needs to be done in the app though it could be added. Would need to ensure the validation errors are compatible with all apps i.e. not tied to translation string keys such as in novo-mobile-apps
