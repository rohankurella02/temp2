import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-hot-toast'

//making an API call
export const userLogin = createAsyncThunk("getUsers", async(user, thunkApi) => {
    let response = await axios.post("/user/login", user)
        // toast.promise(response, {
        //     loading: "Loading...",
        //     success: (res)=> `${res.data.message}`,
        //     error: (err)=> `${err.response.data.message}`

        // })
        // toast.loading("Loading...")
        // console.log({response})
        let userData = response.data;
        console.log(userData.message)
        if(userData.message === "Login Successful") {
            localStorage.setItem("token", userData.payload);
            toast.success("Login Successful")
            return userData.userObj;
        }
        if(userData.message === "User Not Found" || userData.message === "Incorrect Password") {
            // alert(userData.message);
            toast.error(userData.message)
            return thunkApi.rejectWithValue(userData)
        }
})

const userSlice = createSlice({
    name: "user",
    initialState: {
        userObject: {},
        isLoggedIn: false,
        isLoading: false,
        isError: false,
        errorMessage: ""
    },
    reducers: {
        logOut: (state) => {
            state.isLoggedIn = false;
            state.userObject = null;
            localStorage.removeItem("token");
            state.errorMessage = "";
            state.isError = false;
            return state;
        }
    },
    extraReducers: {
        [userLogin.pending]: (state, action) => {
            state.isLoading = true;
        },
        [userLogin.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.userObject = action.payload;
        },
        [userLogin.rejected]: (state, action) => {
            state.isLoading = false;
            state.userObject = null;
            state.isError = true;
            state.errorMessage = action.payload.message;
        }
    }
})

export const { logOut } = userSlice.actions;

export default userSlice.reducer;

