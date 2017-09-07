# ZC Core JS Modules

- API
- Auth

## Installation

#### Add as a dependency:

`npm i -S git+https://code.zoetrope.io/zconnect/zconnect-js.git`

Or as add as a submodule and:

`npm i -S <path_to_zconnect-js>`

#### Configure with app dependencies

Run `configureZC` passing all the required dependencies as an object. This must be done at or near entry point of the app, before the store is created or the sagas required there will not be defined. This can all be done in an initialisation file which is simply imported at the entry point e.g.

```
// initialiseCore.js
import { configureZC } from 'zc-core'
import { Sentry } from 'react-native-sentry'

import AppSettings from './config/AppSettings'
import endpoints from './config/endpoints'
import jwtStore from './jwtStore'

configureZC({
  Sentry,
  jwtStore,
  endpoints,
  baseURL: AppSettings.baseURL,
  loginTimeout: AppSettings.loginTimeout,
})
```
```
// index.android.js or index.js
import './initialiseCore'
import store from './App/store'
import Root from './App/containers/Root'

const ***REMOVED*** = () => <Root {...this.props} store={store} />

AppRegistry.registerComponent('***REMOVED***', () => ***REMOVED***)
```

#### Add sagas to root saga
```
import { apiSagas, authSagas } from 'zc-core'
...
export default [
  ...
  apiSagas.watcher,
  authSagas.watcher,
]
```

#### Add the reducers to root reducer
```
import apiReducer from 'zc-core/api/reducer'
import authReducer from 'zc-core/auth/reducer'
...
const appReducer = combineReducers({
  ...
  api: apiReducer,
  auth: authReducer,
})
```
NB: Must use `api` and `auth` keys

#### That's it!


## Dependencies

Currently this module has a few app specific dependencies:

### jwtStore

This must provide `get`, `set` and `delete` methods where `set` takes `email` and `token` as arguments and `get` returns the token..

In react-native land:
```
import * as Keychain from 'react-native-keychain'

export default {
  get() {
    return Keychain.getGenericPassword()
  },
  set(email, token) {
    return Keychain
      .setGenericPassword(email, token)
      .then(() => true)
  },
  delete() {
    return Keychain.resetGenericPassword()
  },
}
```

### Sentry

Needed for setting user context on log in and capturing messages and exceptions. Can be a proxied version of the actual Sentry object as long as it provides setUserContext, captureMessage and captureException methods.

### endpoints

The dictionary of endpoint configs used by `apiRequest`

### baseURL

Just that, if we wanted to get rid of these dependencies, this could be set as an environment variable

### loginTimeout

Could be hard coded inside the module if not likely to vary across apps

## Usage

### Auth

[README](./auth/README.md)

### API

[README](./api/README.md)

## Developing (Not used)

`npm run dev`

Watches src files and builds unminified to `lib/zc-core.js` and `lib/zc-core.js.map`. You have to change the `main` entry in `package.json` so that the consuming app uses this version (and remember to change it back for production)

## Building (Not used)

`npm run build`

Generates minified version. Probably this is not needed if webpack is being used by the importing app as will be minified for production then.

## Testing

`npm run test`
