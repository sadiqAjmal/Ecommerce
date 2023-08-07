import React, { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import CartTable from "../items-table";
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderDeatilHeader from "../order-detail-header";
import { useState } from "react";
function SideBar(props) {
  const items = props.items;
  const offcanvasStyle = {
    width: "75%",
  };
  const [products,setProducts] = useState(items.products);
  useEffect(()=>{
    console.log(items.products);
    setProducts(items.products)},[items.products])
  return (
    <>
      <Offcanvas show={props.show} onHide={props.handleClose} placement="end" style={offcanvasStyle}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Order Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <OrderDeatilHeader
            name={items.userName}
            date={items.date}
            orderNo={items.orderNo}
            products={items.products.length}
            amount={items.amount}
          />
          <div className="lead">
            <strong>Product Information</strong>
          </div>
          <CartTable items={products} Cart={false} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default SideBar;
