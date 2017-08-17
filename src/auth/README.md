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
