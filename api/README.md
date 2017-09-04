# ***REMOVED*** - API Module

The `apiRequest` saga is a wrapper around `apiFetch` which takes an endpoint key (and optionally params and payload objects). The endpoint key is used to configure the request as defined in the `endpoints` dictionary.

`apiRequest` can be triggered in 2 ways:
1. via dispatching a `REQUEST` action using the apiRequest action creator
2. invoking the worker generator function directly e.g. as part of another saga.

Whichever method is used the api state for each request is maintained in the `api` slice of the state tree under the `endpoint` and `params` used in the request e.g fetching the `getBrands` endpoint will result in `state.api.{ endpoint: 'getBrands' }.fetching` to be set to true.

There is also a `pollRequest` saga that forks a polling worker that will continually request the given endpoint until a `STOP_POLL` action is dispatched or the endpoint returns an error response (future enhancement: or a given number of sequential error responses as defined in endpoint config)

## Endpoint Config Options

### `url`
String with the path to append to the `baseURL`. Can contain `${id}` to be replaced with the values defined in the `params` dictionary. Will error if a matching value is not found.

### `method`
String - Default: `GET`

### `token`
Boolean - Default: `true` - Whether the JWT token should be included in header

### `logout`
Boolean - Default: `true` - If token set above, whether a `LOGOUT` action should be dispatched after refreshing JWT following a `401` or `403` response (`secureApiSaga`)

### `cache`
Number - Default: `0` - The time to 'cache' responses for in milliseconds. Responses will remain in state until overwritten, i.e. it is not deleted when stale. But the saga won't call `apiFetch` if cached response is younger than cache value set and will just return the stored response (and dispatch a `REQUEST_CACHE_USED` action for logging)

### `schema` (Not implemented)
Normalizr Schema - Default `null` - Response will be normalized using the defined schema and stored in this format

### `storeAt` (Not implemented)
String - Default: `null` - Optional key at which to store the response (normalised if set above). Would simplify selecting data e.g. `state.api.data.<userDefinedKey>`. Would mean that different endpoints can store responses in one place e.g. fetch devices and fetch device can merge data to one place

### `storeMethod` (Not implemented)
Function - Specify method by which to merge the fetched data with the existing data. This could be passed to immutable's `mergeDeepWith` to allow customisation of how fetched data is absorbed.

## Usage

### Basic
This is fine for where you don't need to do any post processing of the server response or where no response is expected.

Config:
```
{
  ...
  getBrands: {
    url: 'api/v1/ir/brands',
    method: 'GET',
    token: true,
    cache: 0,
  },
}
```
Container:
```
import { apiRequest } from 'zc-core/api/actions'
...
const mapDispatchToProps = dispatch => ({
  ...
  fetchBrands: () => dispatch(apiRequest('getBrands')),
})
```

### Parameterised
URL params are stored in `action.meta.params` as key value pairs or key selector pairs where the saga will first select `yield select(<selector>)` to get the value before interpolating in the string. Any param keys passed that aren't named in the url string are appended to the URL as query params.

config:
```
{
  ...
  getWeather: {
    url: 'api/v1/locations/${locationId}/weather_forecast',
    method: 'GET',
    token: true,
    cache: 1 * 60 * 1000, // 1 minute
  },
}
```
Container:
```
import { apiRequest } from 'zc-core/api/actions'
...
const mapDispatchToProps = dispatch => ({
  ...
  fetchWeather: () => dispatch(apiRequest('getWeather', { locationId: selectLocationId })),
})
```

### As part of a saga
Where the server response needs some processing before storage or you need to trigger some other action after.

Note the action passed must follow the FSA format used by the action creators e.g. `{ meta: { endpoint, params }, payload }`

The key difference in `apiRequest` saga when called directly is that any errors are thrown (after updating the api state) to be handled in the calling function. Whereas if triggered using the action creator above, any errors are swallowed (after being stored in the state)

This logic hangs off of the action type triggering the worker i.e. `REQUEST` when using the action creator and `undefined` if called directly like this:

```
import { apiSagas } from 'zc-core'
...
export const fetchDevices = () => {
  function* worker() {
    const endpoint = 'getDevices'
    try {
      const response = yield call(apiSagas.apiRequest, { meta: { endpoint } })
      yield put(actions.receiveDevices(response))
    } catch (error) {
      yield put(actions.deviceFetchError())
      if (error.response && error.response.status === 404) {
        ...
      }
    }
  }
  ...
}
```

### Selecting the API state and response
No matter what method used the api state and response will be stored at `state.api.{ endpoint, params }`. The `api/selectors` include parameterised selectors that simplify selecting the data for a specific request. They require the `endpoint` (and `params` if used) to be passed as props e.g.

```
import { selectPending, selectResponse, selectError } from 'zc-core/api/selectors'
...
const mapStateToProps = state => ({
  fetching: selectPending(state, { endpoint: 'getBrands' }),
  failed: selectError(state, { endpoint: 'getBrands' }),
  brands: selectResponse(state, { endpoint: 'getBrands' }),
})
```
### Polling
Polling an endpoint is as simple as dispatching a `POLL_REQUEST` action with the `endpoint` and `interval` specified in the `meta`. Or using the `pollApiRequest` action creator..
```
import { pollApiRequest, stopPollApiRequest } from 'zc-core/api/actions'
...
const mapDispatchToProps = dispatch => ({
  pollDevices: () => dispatch(stopPollApiRequest('getDevices')),
  stopPolling: () => dispatch(pollApiRequest('getDevices', null, null, AppSettings.dataUpdateFrequency)),
})
```
This will set the `polling` value in the state for that request (state.{ endpoint: getDevices }.polling) and trigger a pollRequest saga until `STOP_POLL_REQUEST` or `REQUEST_ERROR` is dispatched (with matching endpoint in meta)
