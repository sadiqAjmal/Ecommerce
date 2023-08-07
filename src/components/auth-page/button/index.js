import React from "react";
import { Button } from "react-bootstrap";
import '../style.css'
function ReusableButton(props) {
  return (
    <Button
      value={props.value}
      className="button"
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
}

export default ReusableButton;
