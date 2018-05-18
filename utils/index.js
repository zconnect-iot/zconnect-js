import { Map, List } from 'immutable'

export const emptyMap = Map()

export const emptyList = List()

// Returns pending or error true if any of the states passed have these set and
// returns success true if all the states have success true
export const mergeApiStates = states => ({
  pending: states.includes(state => state.get('pending')),
  success: states.every(state => state.get('success')),
  error: states.includes(state => state.get('error')),
})
