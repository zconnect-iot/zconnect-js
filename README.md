# ZC Core JS Modules

- API
- Auth

## Installation

Include platform specific storage module e.g. for RN project:

`npm i -S git+https://code.zoetrope.io/zconnect/zconnect-rn.git`

Add as a dependency:

`npm i -S git+https://code.zoetrope.io/zconnect/zconnect-js.git`

Include the auth and api saga watchers to root saga

```
import { apiSagaWatcher, authSagaWatcher } from 'zconnect-js'
...
export default [
  ...
  apiSagaWatcher,
  authSagaWatcher,
]
```

Add the reducers to combine reducers
```
import { apiReducer, authReducer } from 'zconnect-js'
...
const appReducer = combineReducers({
  ...
  api: apiReducer,
  auth: authReducer,
})
```

## Usage

### Auth

```
import { loginUser } from 'zconnnect-js/auth/actions'
...
const mapDispatchToProps = dispatch => ({
  loginUser: (email, pass) => dispatch(loginUser(email, pass)),
})
```
Triggering actions after logging in user
```
import { LOGIN_USER } from 'zconnnect-js/auth/constants'
...
const doSomethingAfterLogin = () => {
 function* worker() {
    // Some action
 }
 function* watcher() {
   yield takeLatest(LOGIN_USER, worker)
 }
}
```
TBC