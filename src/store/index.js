import { configureStore } from '@reduxjs/toolkit'
//Reducers
import AppSlice from './slices/App.js';

export default configureStore({
  reducer:{
    AppSlice
  }
})