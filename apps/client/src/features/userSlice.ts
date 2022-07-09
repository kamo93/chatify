import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

type User = {
  id: string;
  email: string;
  username: string;
  isLogin: boolean;
};

type ThunkStatus = 'idle' | 'pending' | 'rejected' | 'fulfilled'

type UserSlice = {
  user: User | null;
  status: ThunkStatus;
  error: FetchError | null;
}

const userInitialState: UserSlice = {
  user: null,
  status: 'idle',
  error: null
}

class FetchError extends Error {
  response: any;
  code: number;
  constructor(code: number,response: any) {
    super()
    this.name = "Fetch Error";
    this.code = code;
    this.response = response
  }
}

async function fetchHelper(endpoint: string, body?: BodyInit, options?: Omit<RequestInit, "body">): Promise<any> {
  const response = await fetch(`/api/${endpoint}`, { body, headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } ,...options })
  // response ok are the ones 2xx
  if( response.ok ) {
    return response.json()
  } else {
    // any different response from 2xx
    console.log(response.text, response.status)
    const errResponse = await response.json()
    const err = new FetchError(response.status, errResponse)
    throw err
  }
}

async function fetchPost(endpoint: string, body: any, options?: Omit<RequestInit, "body" | "method">) {
  // const defaultPostHeaders = new Headers() ;
  // defaultPostHeaders.set('Content-Type', 'application/json')
  // defaultPostHeaders.set('Accept', 'application/json')
  return fetchHelper(endpoint, body, { method: 'POST' })
}

// https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
// to use custom errors related with more detail API use thunkAPI.rejectWithValue
const fetchCreateUser = createAsyncThunk('user/createUser', async (userInfo, thunkAPI) => {
  try {
    return await fetchPost('/user/register', userInfo);
  } catch(e) {
    const err = e as FetchError;
    thunkAPI.rejectWithValue(err)
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state = {
        ...state,
        ...action.payload,
      };
    },
    remove: state => {
      state = userInitialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCreateUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.user = action.payload;
      })
      .addCase(fetchCreateUser.rejected, (state, action) => {
        state.status = 'rejected'
        // since we are using rejectWithValue on the createAsyncThunk need to use action.payload
        // state.error = action.error
        state.error = action.payload as FetchError;
      })
  }
});

export const { set, remove } = userSlice.actions;

export default userSlice.reducer;
