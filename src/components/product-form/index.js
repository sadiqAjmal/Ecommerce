import React from "react";
import { Form, Row, Col, Container } from "react-bootstrap";

function ProductFormField(props) {
  const { controlId, label, defaultValue, onChange } = props;

  return (
    <Container fluid>
        <Col>
          <h4>{label}</h4>
        </Col>
        <Col>
          <Form.Group controlId={controlId}>
            <Form.Control
              type={props.type || "text"}
              defaultValue={defaultValue}
              as={props.as || "input"}
              rows={props.rows || 1}
              onChange={onChange} // Add the onChange prop to handle input change events
            />
          </Form.Group>
        </Col>
    </Container>
  );
}

export default ProductFormField;
