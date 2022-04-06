import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import { getCartFromDatabase } from "../api/cartApi";

 const fetchCartDataFromDatabase=createAsyncThunk(
     'fetchCartDataFromDatabase',
     async(userId)=>{
         const response= await getCartFromDatabase(userId)
         return response.data
     }
 )
const cartDataFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
let amount = 0;
for (let i = 0; i < cartDataFromLocalStorage?.length; i++) {
  amount = Number(amount) + Number(cartDataFromLocalStorage[i].amount);
}
const initialState = {
  amount,
  allCartProducts: cartDataFromLocalStorage,
  isLoad:false,
  isOpen:false
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    GET_AMOUNT_CART_LOCALSTORAGE: (state, action) => {
      state.amount = action.payload;
    },
    CHANGE_PRODUCTS_IN_CART: (state, action) => {
      state.allCartProducts = action.payload;
    },
    OPEN_CART_SIDEBAR:(state,action)=>{
       state.isOpen=action.payload
    }
    
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchCartDataFromDatabase.pending, (state, action) => {
        state.isLoad=true
      });
      builder.addCase(fetchCartDataFromDatabase.fulfilled, (state, action) => {
        state.allCartProducts=action.payload
        state.isLoad=false
      });
      builder.addCase(fetchCartDataFromDatabase.rejected, (state, action) => {
        state.isLoad=false
      });
  }
});
export {fetchCartDataFromDatabase}
export const cartAmoutSelector = (state) => state.cart.amount;
export const allCartProductsSelector = (state) => state.cart.allCartProducts;
export const isOpenCartSidebarSelector=(state)=>state.cart.isOpen
export const { GET_AMOUNT_CART_LOCALSTORAGE, CHANGE_PRODUCTS_IN_CART,OPEN_CART_SIDEBAR } =
  cartSlice.actions;
export default cartSlice.reducer;
