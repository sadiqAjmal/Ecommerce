import React from 'react';
import CartPrice from '../CartPrice';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function CartFooter(props)
{
    return(
    <div
    style={{
        marginLeft:"80%",
        width:"20%"
    }}
    >
        <CartPrice title="Sub Total" total={props.subTotal}/>
        <CartPrice title="Tax" total={props.tax}/>
        <CartPrice title="Total" total={props.total}/>
        <Link to="/orders"><Button variant="primary">Place Order</Button></Link>
    </div>
    );
}
export default CartFooter;