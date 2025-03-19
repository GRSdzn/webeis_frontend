import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { UserState } from './user.types'



const initialState: UserState = {
  token: '',
  uuid: '',
  username: '',
  menu: [{
    menuname: '',
    real_name: '',
    visible: false,
    idmenu: '',
    menu_item_data: []
  }]
}

const userSlice = createSlice({
  name: `${SLICE_BASE_NAME}/user`,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.token = action.payload?.token,
      state.uuid = action.payload?.uuid,
      state.username = action.payload?.username
    },
    setUserMenu(state, action: PayloadAction<UserState>){
      state.menu = action.payload.menu
    },

  },
})

export const { setUser,setUserMenu } = userSlice.actions
export default userSlice.reducer
