import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addNote = createAsyncThunk("addnote", async (noteData) => {
  try {
    console.log("add note thunk", noteData);

    const addNoteFetch = await axios
      .post("https://n24y6fo506.execute-api.ap-south-1.amazonaws.com/NotesStage/api/addnote", { noteData })
      .then((res) => res.data.data);
    console.log("add note", addNoteFetch);
    return addNoteFetch;
  } catch (error) {
    error.messageconsole.log(error);
  }
});

export const deleteNote = createAsyncThunk("deletenote", async (noteData) => {
  console.log("id notedata", noteData);
  const deleteNoteFetch = await axios
    .post("https://n24y6fo506.execute-api.ap-south-1.amazonaws.com/NotesStage/api/deletenote", { id: noteData })
    .then((res) => res.data.data);

  console.log("DFFF", deleteNoteFetch);
  return deleteNoteFetch;
});


export const editNote = createAsyncThunk("editnote", async (noteData) => {
  console.log("edithnote Thunk fetching", noteData);
  const editNoteFetch = await axios
    .post("https://n24y6fo506.execute-api.ap-south-1.amazonaws.com/NotesStage/api/editnote", { noteData })
    .then((res) => res.data.data);

    console.log("edithnote Thunk returned", editNoteFetch);

    return editNoteFetch;

});


export const getNote = createAsyncThunk("getnote", async () => {
  console.log("edithnote Thunk fetching");
  const getNoteFetch = await axios
    .get("https://n24y6fo506.execute-api.ap-south-1.amazonaws.com/NotesStage/api/getnote")
    .then((res) => res.data.data);
    
    console.log("gethnote Thunk returned", getNoteFetch);

    return getNoteFetch;
});

const notesSlice = createSlice({
  name: "notes",
  initialState: [],

  extraReducers: (builder) => {
    builder
      .addCase(addNote.fulfilled, (state, action) => {
        console.log(action.payload);
        state.length = 0;

        action.payload.map((obj) => {
          state.push(obj);
        });
      })

      .addCase(deleteNote.fulfilled, (state, action) => {
        console.log("DLLLL", action.payload);

        if (action.payload.length > 0) {
          state.length = 0;
          action.payload.map((obj) => {
            state.push(obj);
          });
        } else {
          state.length = 0;
        }
      })

      .addCase(editNote.fulfilled, (state, action) => {

        console.log("edited note", action.payload);
        state.length = 0;
        action.payload.map((obj) => {
          state.push(obj);
        });
      })
      .addCase(getNote.fulfilled, (state, action) => {

        console.log("getted note", action.payload);
        state.length = 0;
        action.payload.map((obj) => {
          state.push(obj);
        });
      });
  },
});

// reducers: {
//     addNote: (state, action) => {

//         state.push(action.payload);

//     },

//     editNote: (state, action) => {

//         const { id, Econtent1, Econtent2 } = action.payload;
//         const noteToEdit = state.map((note) => {

//             if (note.id === id) {
//                 return {
//                     ...note,
//                     content1: Econtent1,
//                     content2: Econtent2
//                 }
//             }
//             else
//                 return note;

//         });

//         return noteToEdit;
//     },

//       deleteNote: (state, action) => {

//         const idToDelete = action.payload;

//         return state.filter((note) => note.id !== idToDelete);
//     },
// },
// });

// console.log(notesSlice);
// export const { addNote, editNote, deleteNote } = notesSlice.actions;
// export default notesSlice.reducer;

export default notesSlice.reducer;
