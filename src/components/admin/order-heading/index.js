import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import OrderCard from "../card";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../loader";
const getOrderDetails = async (token) => {
  const response = await axios.post(
    'http://localhost:5000/v1/admin/getOrdersDetail',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

const OrderHeading = () => {
  const token = useSelector((store) => store.auth.token);
  const [reqPending,setPending]=useState(true);
  const [orderDetails, setOrderDetails] = useState({
    total: 0,
    count: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOrderDetails(token);
      setOrderDetails(data);
      setPending(false);
    };
    fetchData();
  }, [token]);
  return (
    <Container fluid>
      <Row>
        <Col>
          <OrderCard Title="Total Orders:" SubTitle={reqPending?<Loader/>:orderDetails.count} />
        </Col>
        <Col>
          <OrderCard Title="Total Units:" SubTitle={reqPending?<Loader/>:orderDetails.totalProducts} />
        </Col>
        <Col>
          <OrderCard Title="Total Amount:" SubTitle={reqPending?<Loader/>:`$${orderDetails.total}`} />
        </Col>
      </Row>
    </Container>
  );
};

export default OrderHeading;
