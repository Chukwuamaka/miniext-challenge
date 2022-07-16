import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data } from "../pages";

type InitialState = {
  student: string;
  data: Data;
  error: string;
  loading: boolean;
}

const initialState: InitialState = {
  student: '',
  data: {},
  error: '',
  loading: false
}

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setStudent(state, action: PayloadAction<string>) {
      state.student = action.payload;
    },
    setData (state, action: PayloadAction<Data>) {
      state.data = action.payload;
    },
    setError (state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setLoading (state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    }
  }
})

export const actions = stateSlice.actions;