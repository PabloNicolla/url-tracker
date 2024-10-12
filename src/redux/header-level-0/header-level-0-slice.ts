import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "@/redux/with-types";

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// State Config
//////////////////////////////////////////////////////////////

export interface User {
  id: string | null;
}

interface AuthState extends User {
  status: "idle" | "pending" | "succeeded" | "rejected";
}

const initialState: AuthState = {
  id: null,
  status: "idle",
};

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Async Thunks
//////////////////////////////////////////////////////////////

export const login = createAppAsyncThunk(
  "auth/login",
  async (incomingData: {}, thunkApi) => {
    try {
      console.log("[AUTH_SLICE]: fn login: running...");
      return {};
    } catch (error) {
      console.log("[AUTH_SLICE]: fn login: running...");
      throw new Error("testing");
    }
  },
  {
    condition(arg, thunkApi) {
      return false;
    },
  },
);

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Slice
//////////////////////////////////////////////////////////////

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn(state, action: PayloadAction<User>) {
      console.log("[AUTH_SLICE]: Action loggedIn...");

      return {
        ...state,
        ...action.payload,
        status: "succeeded",
        initialLoadStatus: "loaded",
        loginError: null,
        registerError: null,
      };
    },
  },
  selectors: {
    selectAuthData: (authState) => authState,
    selectUserId: (authState) => authState.id,
  },
  extraReducers: (builder) => {
    builder

      //////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////// login Thunk
      //////////////////////////////////////////////////////////////

      .addCase(login.pending, (state) => {
        state.status = "idle";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
      });
  },
});

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Slice Exports
//////////////////////////////////////////////////////////////

export default authSlice.reducer;
export const { selectAuthData, selectUserId } = authSlice.selectors;
export const { loggedIn } = authSlice.actions;

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Custom Selector Exports
//////////////////////////////////////////////////////////////

// export const selectAuthUser = createSelector(
//   [selectUserId, selectUserEmail, selectUserUsername, selectUserFirstName, selectUserLastName, selectUserImageURL],
//   (id, email, username, firstName, lastName, imageURL) => {
//     const user: User = {
//       id: id,
//       email: email,
//       username: username,
//       firstName: firstName,
//       lastName: lastName,
//       imageURL: imageURL,
//     };
//     return user;
//   },
// );
