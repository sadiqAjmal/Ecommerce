import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from '../slices/auth-slice'
import storage from 'redux-persist/lib/storage';
import expireReducer from 'redux-persist-transform-expire';
import cartReducer from '../slices/cart-slice'
import productReducer from '../slices/products-slice';
import GetOrders from '../slices/order-slice';
const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    expireReducer('cart', {
      expireSeconds: 900,
      expiredState: {},
      purgeOnExpire: true, 
    }),
  ],
};
const persistedReducer = persistReducer(persistConfig, cartReducer);
export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    products: productReducer,
    auth:authReducer,
    order:GetOrders,
  },
});
export const persistor = persistStore(store);