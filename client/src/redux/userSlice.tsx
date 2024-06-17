import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  _id: string;
  name: string;
  email: string;
  profile_pic: string;
  token: string;
  onlineUser: any[];
  socketConnection: any;
}

const initialState: UserState = {
  _id: "",
  name: "",
  email: "",
  profile_pic: "",
  token: "",
  onlineUser: [],
  socketConnection: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      state._id = action.payload._id || state._id;
      state.name = action.payload.name || state.name;
      state.email = action.payload.email || state.email;
      state.profile_pic = action.payload.profile_pic || state.profile_pic;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.profile_pic = "";
      state.token = "";
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;

export default userSlice.reducer;
