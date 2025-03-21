import { combineReducers } from '@reduxjs/toolkit'
import session, { SessionState } from './sessionSlice'
import user from './userSlice'
import { UserState } from './user.types'


const reducer = combineReducers({
  session,
  user,
})

export type AuthState = {
  session: SessionState
  user: UserState,
}

export * from './sessionSlice'
export * from './userSlice'

export default reducer
