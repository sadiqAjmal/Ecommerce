import React, { useState } from "react";
import { Card,Button} from "react-bootstrap";
import styles from "./style";
import User from "../UserInput";
import { Link } from "react-router-dom";

function UserPage(props) {
  const [userData, setUserData] = useState({});
  const handleInputChange = (inputName, inputValue) => {
    setUserData({
      ...userData,
      [inputName]: inputValue,
    });
  };
  const handleButtonClick = (event) => {
    event.preventDefault();
    console.log(userData);
  };

  return (
    <div id={props.action}>
      <h1 style={styles.h1}>{props.action}</h1>
      <Card style={styles.card}>
        <Card.Body>
          {props.info.map((item) => (
            <User
              key={item.name}
              name={item.name}
              inputType={item.type}
              onInputChange={handleInputChange}
              arrName={item.arrName}
            />
          ))}
          <Button value={userData} style={styles.button} onClick={handleButtonClick}>
            {props.action}
          </Button>
          {props.options.map((item) => (
            <Card.Text style={{ textAlign: "center" }} key={item.action}>
              {item.option}
              <span>
                <Link
                  to={item.to}
                  style={{ color: "blue", textDecoration: "none" }}
                >
                  {item.action}
                </Link>
              </span>
            </Card.Text>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserPage;
