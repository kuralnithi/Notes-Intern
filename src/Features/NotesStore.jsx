import { configureStore } from "@reduxjs/toolkit";
import NotesReducer from "./NotesSlice";
import taskReducer from "./TaskSlice"; 
import userReducer from "./UserSlice"; 

export const store = configureStore({
  reducer: {
    NotesPageReducer: NotesReducer,
    tasks: taskReducer,
    user: userReducer
  },
});
