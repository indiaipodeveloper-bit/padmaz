import {configureStore} from "@reduxjs/toolkit"
import AuthSliceReducer from "./slices/AuthSlice"
import CartSliceReducer from "./slices/CartSlice"



export const store = configureStore({
reducer:{
    auth:AuthSliceReducer,
    cart:CartSliceReducer
}
})