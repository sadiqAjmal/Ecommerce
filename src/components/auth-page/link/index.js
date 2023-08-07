import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../style.css'
function ReusableLink(props) {
  return (
    <Card.Text style={{ textAlign: "center" }}>
      {props.option}
      <span>
        <Link to={props.to} style={{ color: "blue", textDecoration: "none" }}>
          {props.action}
        </Link>
      </span>
    </Card.Text>
  );
}

export default ReusableLink;
