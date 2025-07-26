import { configureStore } from "@reduxjs/toolkit";
import BurgerSlice from "./BurgerSlice";

export const store = configureStore({
  reducer: {
    burger: BurgerSlice,
  },
});

