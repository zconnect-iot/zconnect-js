# ZC Core JS Modules

- API
- Auth

## Installation

#### Add as a dependency:

`npm i -S git+https://code.zoetrope.io/zconnect/zconnect-js.git`

#### Configure with app dependencies

Run `configure` passing all the required dependencies as an object. This must be done at or near entry point of the app, before the store is created or the sagas required there will not be defined. This can all be done in an initialisation file which is simply imported at the entry point e.g.

```
// initialiseCore.js
import { configure } from 'zc-core'
import { Sentry } from 'react-native-sentry'

import AppSettings from './config/AppSettings'
import endpoints from './config/endpoints'
import processError from './errors'
import jwtStore from './jwtStore'

configure({
  Sentry,
  processError,
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
import { apiReducer, authReducer } from 'zc-core'
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

Needed for setting user context on log in and capturing messages.

### processError

Currently this is needed to filter out exceptions like `404` on login but might be simpler if this was handled by configuring a proxy for `Sentry` above and just using that to do everything

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

## Developing

`npm run dev`

Watches src files and builds unminified to `lib/zc-core.js` and `lib/zc-core.js.map`. You have to change the `main` entry in `package.json` so that the consuming app uses this version (and remember to change it back for production)

## Building

`npm run build`

Generates minified version. Probably this is not needed if webpack is being used by the importing app as will be minified for production then.

## Testing

`npm run test`
