import React, { useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import Header from "../../header";
import ProductsPage from "../products-page";
import OrderPage from "../order-page";
import { useDispatch,useSelector } from "react-redux";
import { getAdminOrders } from "../../../Redux/slices/order-slice";
function AdminPage() {
  const [activeTab, setActiveTab] = useState("/products");
  const dispatch=useDispatch();
  const loginInfo=useSelector((store)=>store.auth)
  const handleTabChange = (eventKey) => {
    setActiveTab(eventKey);
    dispatch(getAdminOrders({skip:0,limit:10,token:loginInfo.token}))
    console.log("On select");
  };
  return (
    <>
      <Header />
      <Container style={{ marginTop: '65px' }} fluid>
        <Row style={{ height: '100%' }}>
          <Col lg={3} md={3} sm={3} xs={3} style={{ background:'#F8F9FA',position: 'fixed', top: '60px', bottom: 0, left: 0 }}>
            <Tab.Container activeKey={activeTab} onSelect={(eventKey)=>{handleTabChange(eventKey)}}>
              <Nav variant="pills light" className="flex-column" >
                <Nav.Item>
                  <hr className="sidebar-divider" />
                  <Nav.Link eventKey="/products">Products</Nav.Link>
                  <hr className="sidebar-divider" />
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="/orders">Orders</Nav.Link>
                  <hr className="sidebar-divider" />
                </Nav.Item>
              </Nav>
            </Tab.Container>
          </Col>
          <Col lg={9} md={9} sm={9} xs={9} style={{ marginLeft: '25%', paddingTop: '1rem' }}>
            {activeTab === "/products" ? <ProductsPage /> : <OrderPage />}
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default AdminPage;