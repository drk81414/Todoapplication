import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todoService from "./todoService";

const initialState = {
  taskList : [],
  isLoading:false
};

export const fetchTasks = createAsyncThunk(
  "todo/fetchTasks",
  async (authToken, thunkAPI) => {
    try {
      const response = await todoService.fetchTasks(authToken);
      if (response.success) return response;
      else {
        throw new Error(response.error.error);
      }
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
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.taskList = [];
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.taskList = action.payload.TodoList;
          state.isLoading = false;
        }
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.taskList = [];
        state.isLoading = false;
      });
  },
});

// export const {} = todoSlice.actions;
export default todoSlice.reducer;
