import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null, //if user exists in localStorage get user or null
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Register the user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(register.pending, (state) => { //when pending
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => { //when fulfilled 
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) =>{ //when rejected
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
