import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Tạo action async để fetch dữ liệu
export const category = createAsyncThunk("category", async () => {
  const response = await fetch("http://127.0.0.1:8000/api/categorys", {
    pageNumber: 1,
  });
  const c = await response.json();
  return c;
});

// Khởi tạo state ban đầu
const initialState = {
  posts: [],
  status: "idle", // Trạng thái ban đầu là "idle"
  error: "", // Khởi tạo error là rỗng
};
// Tạo Slice
const testSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Các reducers bình thường điều chỉnh state ở đây...
  },
  extraReducers: (builder) => {
    builder.addCase(category.pending, (state) => {
      state.status = "loading"; // Cập nhật status là "loading"
    });
    builder.addCase(category.fulfilled, (state, action) => {
      state.status = "succeeded"; // Cập nhật status là "succeeded"
      state.posts = action.payload; // Cập nhật dữ liệu posts từ payload của action
    });
    builder.addCase(category.rejected, (state, action) => {
      state.status = "failed"; // Cập nhật status là "failed"
      state.error = action.error.message; // Lưu trữ thông báo lỗi từ action
    });
  },
});
export default testSlice.reducer;
