import { createSlice } from "@reduxjs/toolkit"

// Создаём slice
const counter = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    // Правильный синтаксис функции
    increment: (state, action) => state + 1
  }
})

// Экспортируем actions и reducer
export const { increment } = counter.actions
export default counter.reducer



