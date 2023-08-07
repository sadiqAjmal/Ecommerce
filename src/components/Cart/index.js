import React from "react";
import CartHeading from "../cart-heading";
import CartTable from "../items-table";
import Header from "../header";
import {useSelector} from 'react-redux';
function Cart(){
  const cartItems=useSelector((state)=>state.cart.value)
  const order=useSelector((store)=>store.cart.orderPending);
  return (
    <>
      <Header />
      {
       (cartItems.length!==0)?<>
      <CartHeading backPath="/" title="Your Shopping Bag" />
      <CartTable items={cartItems} Cart={true} />
    </>:(!order)&&<>
    <CartHeading backPath="/" title="Your Shopping Bag" />
    <h1 style={{display:'block', color:'red',marginTop:'25%',textAlign:'center'}}>Your Cart is Empty :{"("}</h1></>}
    </>
  );
  }
export default Cart;
