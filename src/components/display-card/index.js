import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Element from "../card";
import { Container, Row, Col } from "react-bootstrap";

function Display({items}) {
  return (
    <Container fluid>
      <Row xs={1} md={2} lg={4}>
        {items.map((item) => (
          <Col key={item._id} style={{ marginBottom: "2%" }}>
            <Element item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Display;
