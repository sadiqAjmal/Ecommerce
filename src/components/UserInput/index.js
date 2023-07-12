import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, InputGroup, Form} from 'react-bootstrap';

function User(props) {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const handleChange = (event) => {
    const enteredValue = event.target.value;
    setInputValue(enteredValue);
    setIsValid(validateInput(enteredValue));
    props.onInputChange(props.arrName, enteredValue);
  };
  const validateInput = (value) => {
    switch (props.inputType) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value); 
        case 'password':
        return value.length>6
      default:
        return true;
    }
  };

  return (
    <div style={{padding:'1%'}}>
      <Card.Subtitle className="mb-2">{props.name}</Card.Subtitle>
      <InputGroup className="mb-3">
        <Form.Control
          onChange={handleChange}
          aria-label={props.name}
          type={props.inputType}
          placeholder={props.name}
          value={inputValue}
        />
      </InputGroup>
      {!isValid && (
        <p className="text-danger">
          Please enter a valid {props.inputType}.
        </p>
      )}
    </div>
  );
}

export default User;
