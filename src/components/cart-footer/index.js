import React from 'react';
import CartPrice from '../cart-price';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Loader from '../loader';
function CartFooter(props) {
  const formatToTwoDecimalPoints = (value) => {
    return parseFloat(value).toFixed(2);
  };
 const navigate=useNavigate();
  const OrderInfo=useSelector((store)=>store.cart);
  OrderInfo.success && navigate('/orders')
  return (
    <div style={{ marginLeft: "80%", width: "20%" }}>
      <CartPrice title="Sub Total" total={formatToTwoDecimalPoints(props.subTotal)} />
      <CartPrice title="Tax" total={formatToTwoDecimalPoints(props.tax)} />
      <CartPrice title="Total" total={formatToTwoDecimalPoints(props.total)} />
        <Button variant="primary" onClick={()=>{props.handleClick()}}>{OrderInfo.orderPending?<Loader/>:"Place Order"}</Button>
    </div>
  );
}
export default CartFooter;
