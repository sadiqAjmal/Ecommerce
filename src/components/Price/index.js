import React from "react";
import './style.css'
function Price(props) {
  return (
    <>
      {props.title&&<span>{props.title}:</span>} <span className={props.className}>${props.price}</span>
    </>
  );
}
export default Price;
