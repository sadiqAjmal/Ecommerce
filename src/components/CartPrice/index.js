import React from "react";
import Price from "../Price";
import '../Price/style.css'

function CartPrice(props)
{
    return(
        <div >
       <Price className="price-cart" title={props.title} price={ props.total}/>
    </div>
    )
}
export default CartPrice;