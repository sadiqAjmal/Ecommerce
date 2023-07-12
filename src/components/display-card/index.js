import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Element from "../Card";
import {useSelector} from "react-redux/es/hooks/useSelector";
import { Container, Row, Col } from "react-bootstrap";
function Display(props) {
  const items = useSelector((state)=> state.products.value);
  return (
    <Container>
      <Row>
        {items.map((item) => (
          <Col key={item.key} className='col-12 col-md-6 col-lg-3' style={{ marginTop: "2%" }}>
            <Element item={item}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default Display;