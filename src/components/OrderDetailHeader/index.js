import React from "react";
import { Table } from "react-bootstrap";
function OrderDeatilHeader(props)
{
return (
    <>
    <hr/>
    <Table borderless hover size='lg'>
        <thead>
            <tr>
            <th>Date</th>
            <th>Order#</th>
            <th>User</th>
            <th>Products</th>
            <th>Amount($)</th>
            </tr>
         </thead>
         <tbody>
            <tr>
                <td>{props.date}</td>
                <td>{props.orderNo}</td>
                <td>{props.name}</td>
                <td>{props.products}</td>
                <td>{props.amount}</td>
            </tr>
         </tbody>
    </Table>
    <hr/>
    </>
    )
}
export default OrderDeatilHeader;