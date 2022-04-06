import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductsByCollection } from "../api/collectionApi";


const fetchByCollection = createAsyncThunk(
  "collection/fetchByCollection",
  async (payload) => {
    const response = await getProductsByCollection(payload);
    return response.data;
  }
);
const initialState = {
  products: [],
  filter:[],
  isLoad:false,
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
   FILTER:(state,action)=>{
     if(action.payload==='delete'){
     state.filter=[] 
     return
     }
      const check=state.filter.every(e=>e[Object.keys(e)[0]]!==action.payload[Object.keys(action.payload)[0]])
      if(!check){
        const index=state.filter.findIndex((e)=>e[Object.keys(e)[0]]===action.payload[Object.keys(action.payload)[0]])
        state.filter.splice(index,1)
        return
      }
      state.filter.push(action.payload)
   },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchByCollection.pending,(state,action)=>{
      state.isLoad=true
    })
    builder.addCase(fetchByCollection.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoad=false
    });
    // xem lai
    builder.addCase(fetchByCollection.rejected,(state,action)=>{
     state.products=[]
     state.isLoad=false
    })
  },
});


const collectionSelector=state=>state.collection.products
const isLoadSelector=state=>state.collection.isLoad
export {fetchByCollection,collectionSelector,isLoadSelector};
export const {FILTER}=collectionSlice.actions
export default collectionSlice.reducer;
