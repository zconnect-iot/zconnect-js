import { fromJS } from 'immutable'
import { SET_LOCALE } from './constants'

const initialState = fromJS({
  code: 'en',
})

export default function localeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOCALE:
      return state.set('code', action.payload)

    default:
      return state
  }
}
