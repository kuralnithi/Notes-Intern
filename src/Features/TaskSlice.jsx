import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addTask = createAsyncThunk("addtask", async (taskData) => {
  try {
    console.log("add task thunk", taskData);

    const addTaskFetch = await axios
      .post("http://localhost:5000/api/addtask", { taskData })
      .then((res) => res.data.data);

    return addTaskFetch;
  } catch (error) {
    console.log(error);
  }
});

export const deleteTask = createAsyncThunk("deletetask", async (taskData) => {
  const deleteTaskFetch = await axios
    .post("http://localhost:5000/api/deletetask", {  taskData })
    .then((res) => res.data.data);
  console.log("deleteTaskFetch", deleteTaskFetch);

  return deleteTaskFetch;
});

export const updateTask = createAsyncThunk("updateTask", async (taskData) => {
  const updateTaskFetch = await axios.post(
    "http://localhost:5000/api/updatetask",
    { taskData }
  ).then((res) => res.data.data);
  console.log(updateTaskFetch.data);

  return updateTaskFetch;
});
export const getTask = createAsyncThunk("getTask", async (taskData) => {
  const getTaskFetch = await axios
    .post("http://localhost:5000/api/gettask",{taskData})
    .then((res) => res.data.data);

  console.log("getted task from fetch", getTaskFetch);
  return getTaskFetch;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],

  extraReducers: (builder) => {
    builder
      .addCase(addTask.fulfilled, (state, action) => {
        state.length = 0;
        console.log(action.payload);
        action.payload.map((obj) => {
          state.push(obj);
        });
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        console.log("deleted tasks addcase", action.payload);
        state.length = 0;

        action.payload.map((obj) => {
          state.push(obj);
        });
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        state.length = 0;

        action.payload.map((obj) => {
          state.push(obj);
        });
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.length = 0;

        action.payload.map((obj) => {
          state.push(obj);
        });
      });
  },
});

// reducers: {
//     addTask: (state, action) => {
//         state.push(action.payload);
//     },
//     editTask: (state, action) => {
//         const { id, content } = action.payload;
//         const taskToEdit = state.find((task) => task.id === id);

//         if (taskToEdit) {
//             taskToEdit.content = content;
//         }
//     },
//     deleteTask: (state, action) => {
//         const idToDelete = action.payload;
//         return state.filter((task) => task.id !== idToDelete);
//         },
// },
// });

// export const { addTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
