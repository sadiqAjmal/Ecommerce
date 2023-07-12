import React from "react";
import { Offcanvas } from "react-bootstrap";
import CartTable from "../ItemsTable";
import items from "../ItemsTable/items";
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderDeatilHeader from "../OrderDetailHeader";
function SideBar({ name, ...props }) {
  const offcanvasStyle = {
    width: "75%",
  };
  return (
    <>
      <Offcanvas show={props.show} onHide={props.handleClose} placement="end" style={offcanvasStyle}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Order Details
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <OrderDeatilHeader name="Sadiq Ajmal" date="14 October 2023" orderNo={2344} products={22} amount="20"/>
            <div className="lead"><strong>Product Information</strong></div>
          <CartTable items={items} Cart={false} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;
