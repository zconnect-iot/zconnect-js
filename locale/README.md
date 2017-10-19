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

## Translator

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

This provides any component to access the translate function (`t`) via `this.context` using the `withTranslator` HOC..


## withTranslator()
```
import { withTranslator } from 'zc-core/hocs'
...

export default withTranslator(LoginForm)
```
The translate function will be passed down as a prop (`this.props.t`)

The downside to either approach is that a change in context will not trigger a rerender in components nested inside any that implement `shouldComponentUpdate` like `connect`. There is a work around which involves [subscribing](https://medium.com/@mweststrate/how-to-safely-use-react-context-b7e343eff076) to the provider updates which could be implemented in this HOC in the future. So best to use the HOC instead of accessing context directly to minimise effort if/when we get round to doing that
