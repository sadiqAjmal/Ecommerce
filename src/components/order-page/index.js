import React from "react";
import OrderTable from "../order-table";
import CartHeading from "../cart-heading";
import { useSelector,useDispatch} from "react-redux";
import {getOrder} from "../../Redux/slices/order-slice";
import Header from "../header";
import PaginationFooter from "../pagination";
function Orders() {
    const ordersInfo = useSelector((state) => state.order);
    const loginInfo=useSelector((store)=>store.auth)
    const dispatch=useDispatch();
return(
<>
<Header/>
<CartHeading backPath="/" title="Orders"/>
<OrderTable items={ordersInfo.Orders}/>
<div className="fixed-bottom">
    <PaginationFooter totalItems={ordersInfo.count} itemsOnPage={8} itemString={"Total Orders "} onPageChange={async(number)=>{
    let skip = (number - 1) * 8;
    dispatch(getOrder({skip:skip,limit:8,token:loginInfo.token}));
}}/>
</div>
</>);
}
export default Orders;