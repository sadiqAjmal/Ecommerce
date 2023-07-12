import React from "react";
import OrderTable from "../OrderTable";
import CartHeading from "../CartHeading";
import orders from "../OrderTable/Order";
import Header from "../Header";
function Orders() {
return(
<>
<Header/>
<CartHeading backPath="/" title="Orders"/>
<OrderTable items={orders}/>
</>);
}
export default Orders;