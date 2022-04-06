import {configureStore} from '@reduxjs/toolkit'
import accountSlice from '../features/accountSlice'
import cartSlice from '../features/cartSlice'
import collectionSlice from '../features/collectionSlice'
import searchSlice from '../features/searchSlice'
import userSlice from '../features/userSlice'

const store=configureStore({
    reducer:{
     collection:collectionSlice,
     search:searchSlice,
     cart:cartSlice,
     account:accountSlice,
     user:userSlice
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false,
        })
})

export default store