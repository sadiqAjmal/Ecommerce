import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './Slice/cartSlice'
import productReducer from './ProductsSlice/productsSlice'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig,cartReducer);
export const store = configureStore({
  reducer: {
    cart:persistedReducer,
    products:productReducer
  },
})
export const persistor = persistStore(store)