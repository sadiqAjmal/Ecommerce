import { createSlice } from '@reduxjs/toolkit'
import items from '../../components/ItemsTable/items'
const initialState = {
  value: items.slice(0,8),
}
export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    decrementQuantity: (state,action) => {
        state.value=state.value.map((item)=>{
            if(item.key===action.payload.key)
            {
                return ({...item,quantity:item.quantity-1});
            }
            return item;
        })
    },
    incrementQuantity: (state,action) => {
        state.value=state.value.map((item)=>{
            if(item.key===action.payload.key)
            {
                return ({...item,quantity:item.quantity+1});
            }
            return item;
        })
    },
    updateProducts:(state,action)=>
    {
        state.value=action.payload;
    }
  },
})
export const { incrementQuantity, decrementQuantity,updateProducts} = productSlice.actions
export default productSlice.reducer