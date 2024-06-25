import { createSlice } from "@reduxjs/toolkit";

// Define a user slice for managing user information and authentication token within the Redux state.
// This includes reducers to set user data and authentication token.
const userSlice = createSlice({
  name: "user",
  initialState: {
    // Set initial state to null to avoid (!user) become true when user: []
    user: null,
    token: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    }
  }
})

export const { setUser, setToken } = userSlice.actions;
export default userSlice.reducer;