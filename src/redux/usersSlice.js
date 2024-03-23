import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { user: {}, data: [] };

export let deluser = createAsyncThunk("user/delete", async (id) => {
  let { data } = await axios.delete(
    `http://localhost:5000/user/${id}`,
  
    
  );

  return data;
});
export let adduser = createAsyncThunk("user/post", async (Category,subCategory,priority,Agent,Requester,SRNumber) => {
  let { data } = await   axios
  .post(`http://localhost:5000/user`,{
    Category,
    subCategory,
    priority,
    Agent,
    Requester,
    SRNumber,
  });
  
  return data;
});

export let getuser = createAsyncThunk("user/get", async () => {
  let { data } = await axios.get(
    `http://localhost:5000/user`,
    );
    //console.log(data)

  return data;
});

let usersSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (bulider) => {
    bulider.addCase(deluser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    bulider.addCase(getuser.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    bulider.addCase(adduser.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export let userreducer = usersSlice.reducer;
