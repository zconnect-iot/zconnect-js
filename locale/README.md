# ZConnect Core JS - locale

This contains all the shared and (hopefully) resusable logic for app localisation. Specifically:

## Reducer

A simple locale reducer that stores the locale code in the redux store under the `locale` key. It initialises as `en`. It is also where fallbacks can be defined e.g. if `SET_LOCALE` action is dispatched with a key like `es-ES`, it could switch to `es`.

## Actions

`setLocale` - dispatches `SET_LOCALE` with locale string in payload

## selectors

`selectLocaleCode` - Gets the current locale code from the store
`selectLocaleLanguage` - Returns the language name derived from the
`selectAvailableLanguages` - List of languages for which translations are available

## <Translator />

This provides a translate function to all nested children (via react context) which will return the translation for a given key in the currently selected language. It needs to be near the root of the app but below `<Provider/>` as it connects to the store to get the locale e.g.

```
// root index.js
ReactDOM.render(
  <Provider store={store}>
    <Translator>
      <ConnectedRouter history={history}>
        <Root />
      </ConnectedRouter>
    </Translator>
  </Provider>,
  document.getElementById('root'),
)
```

This provides any component to access the translate function (`t`) via `this.context` like so:

```
// Nav.js
class Nav extends React.Component {
  render() {
    const { t } = this.context
    return (
      <nav>
        ...
        <Button>{t('logout')}</Button
      </nav>
    )
  }
}

Nav.contextTypes = {
  t: PropTypes.func,
}
```
Note that `contextTypes` must be defined for the component to 'see' the function. In a stateless functional component context is passed as second argument e.g.

```
const Login = (props, { t }) => <button>{t('login').toUpperCase()}</button>
```
