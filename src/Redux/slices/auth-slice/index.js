import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = 'http://localhost:5000/v1/auth';
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
});
export const signup = createAsyncThunk('auth/signup', async (userData, thunkAPI) => {
  let response;
  try {
    response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
});
export const forgotPassword = createAsyncThunk('auth/forgot-password', async (email, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
});

export const verifyToken = createAsyncThunk('newpass/verify-token', async (token, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/newpass/verify-token`, {}, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
});

export const resetPass = createAsyncThunk('newpass/reset-pass', async ({newPassword,token}, thunkAPI) => {
  try
  {const response = await axios.post(`${API_URL}/newpass/resetPassword`,{newPass:newPassword},{
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });                                                                                                     
  return response.data;}
 catch (error) {
  throw error.response.data.error;
}});

export const verifyUser = createAsyncThunk('verify-user', async (token, thunkAPI) => {
  try
  {const response = await axios.post(`${API_URL}/verify-user`,{},{
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });                                                                                                     
  return response.data;}
 catch (error) {
  throw error.response.data.error;
}});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null, // Get the token from local storage if it exists
    pending: false,
    failed: false,
    success: false,
    name: localStorage.getItem('name') || null, // Get the name from local storage if it exists
    role: localStorage.getItem('role') || null,
    error: "",
  },
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.pending = false;
      state.failed = false;
      state.success = false;
      state.name = null;
      state.role = 'user';
      localStorage.removeItem('role');
      localStorage.removeItem('token');
      localStorage.removeItem('name');
    },    
    resetState:(state)=>{
      state.pending= false;
      state.failed= false;
      state.success= false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.pending = true;
        state.failed = false;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.pending = false;
        state.failed = false;
        state.success = true;
        state.token = action.payload.token;
        state.name = action.payload.name;
        state.role = action.payload.role;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('name', action.payload.name);
        localStorage.setItem('role',action.payload.role);
      })
      .addCase(signup.pending, (state) => {
        state.pending = true;
        state.failed = false;
        state.success = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.pending = false;
        state.failed = false;
        state.success = true;
        state.token = action.payload.token;
        state.name = action.payload.name;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.pending = true;
        state.failed = false;
        state.success = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.pending = false;
        state.failed = false;
        state.success = true;
      })
      .addCase(verifyToken.pending, (state) => {
        state.pending = true;
        state.failed = false;
        state.success = false;
      })
      .addCase(verifyToken.fulfilled, (state) => {
        state.pending = false;
        state.failed = false;
        state.success = true;
      })

      .addCase(resetPass.pending, (state) => {
        state.pending = true;
        state.failed = false;
        state.success = false;
      })
      .addCase(resetPass.fulfilled, (state) => {
        state.pending = false;
        state.failed = false;
        state.success = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.pending = false;
        state.failed = true;
        state.success = false;
        state.error = action.error.message 
      })
      .addCase(signup.rejected, (state, action) => {
        state.pending = false;
        state.failed = true;
        state.success = false;
        state.error = action.error.message // Set the error message in the state
        console.log(action.error);
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.pending = false;
        state.failed = true;
        state.success = false;
        state.error = action.error.message 
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.pending = false;
        state.failed = true;
        state.success = false;
        state.error = action.error.message 
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.pending = false;
        state.failed = true;
        state.success = false;
        state.error = action.error.message 
      })
      .addCase(verifyUser.pending, (state) => {
        state.pending = true;
        state.failed = false;
        state.success = false;
      })
      .addCase(verifyUser.fulfilled, (state) => {
        state.pending = false;
        state.failed = false;
        state.success = true;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.pending = false;
        state.failed = true;
        state.success = false;
        state.error = action.error.message 
      })
  },
});
export const { logOut,resetState } = authSlice.actions;
export default authSlice.reducer;
