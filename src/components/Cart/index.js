import React,{useState} from "react";
import CartHeading from "../CartHeading";
import CartTable from "../ItemsTable";
import CartFooter from "../CartFooter";
import Header from "../Header";
import {useSelector,useDispatch} from 'react-redux';
import { updateCart } from "../../Redux/Slice/cartSlice";
import RemoveAlert from "../DeleteItem";
function Cart(){
  const [removeAlert,setRemove]=useState(false);
  const dispatch= useDispatch();
  const cartItems=useSelector((state)=>state.cart.value)
  const [itemSt,setItem]=useState(null);
  const handleQuantityChange = (item, quantityChange) => {
    const updatedCartItems = cartItems.map((cartItem, index) => {
      if (cartItem.key === item.key) {
        const newQuantity = cartItem.quantity + quantityChange;
        if (newQuantity === 0) {
          setItem(item);
            setRemove(true);
          return cartItem;
        }
        return { ...cartItem, quantity: newQuantity };
      } else {
        return cartItem;
      }
    });
    const filteredCartItems = updatedCartItems.filter((item) => item !== null);
    dispatch(updateCart(filteredCartItems));
  };
  console.log(cartItems);
  return (
    <>
     <RemoveAlert show={removeAlert} onHide={()=>setRemove(false)} setShow={setRemove} handleRemove={(it)=>{
     const update=cartItems.filter((i)=>{return i.name!==it.name}) 
     dispatch(updateCart(update))}} item={itemSt}/>
      <Header />
      {
       (cartItems.length!==0)?<>
      <CartHeading backPath="/" title="Your Shopping Bag" />
      <CartTable items={cartItems} handleQuantityChange={handleQuantityChange} Cart={true} />
      <CartFooter total="20" tax="8" subTotal="12" />
    </>:<h1 style={{display:'block', color:'red',marginTop:'25%',textAlign:'center'}}>Your Cart is Empty :{"("}</h1>}
    </>
  );
  }
export default Cart;
