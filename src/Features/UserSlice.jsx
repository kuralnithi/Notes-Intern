import { createSlice } from "@reduxjs/toolkit";

const userSlice =createSlice({
    name : "users",
initialState:{
    username:"",
    emailid:"",
    login:false,
},
reducers:{

setUsername:(state,action)=>{
    console.log("action",action);
    state.username = action.payload
},
setEmailid:(state,action)=>{

    state.emailid = action.payload

},
setLogin:(state,action)=>{
console.log("actionnn logggin",action);
    state.login = action.payload

}

}


})

export default userSlice.reducer;
export const {setUsername,setEmailid,setLogin} = userSlice.actions;