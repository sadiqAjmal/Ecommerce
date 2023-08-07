import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "../style.css";
import User from "../user-input";
import ReusableLink from "../link";
import ReusableButton from "../button";
import { useDispatch, useSelector } from "react-redux";
import { resetState, signup } from "../../../Redux/slices/auth-slice";
import Loader from "../../loader";
import { useNavigate } from "react-router";
import AlertModal from "../../modal";

function Signup() {
  const signUpInfo = useSelector((store) => store.auth);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const handleInputChange = (inputName, inputValue) => {
    setUserData({
      ...userData,
      [inputName]: inputValue,
    });
  };
  const navigate = useNavigate();

  const handleButtonClick = (event) => {
    event.preventDefault();
    if(userData.password==userData.confirmPassword)
    {
    try {
      dispatch(signup(userData));
    } catch (err) {
      setAlertText("Signup Failed");
      setAlertTitle("Error!");
      setShowAlert(true);
    }}
    else{
      console.log(userData);
      setAlertText("Passwords do not match");
      setAlertTitle("Error!");
      setShowAlert(true);
    }
  };
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

   useEffect(() => {
    if (signUpInfo.success) {
      setAlertText("Signup Successful");
      setAlertTitle("Success!");
      setShowAlert(true);
      navigate('/login');
      dispatch(resetState());
    } else if (signUpInfo.failed) {
      setAlertText(signUpInfo.error);
      setAlertTitle("Error!");
      setShowAlert(true);
      dispatch(resetState());
    }
  }, [signUpInfo.success, signUpInfo.failed]);
  return (
    <div>
      <AlertModal Title={alertTitle} Body={alertText} show={showAlert} onHide={() => setShowAlert(false)} />
      <h1 className="h1">Signup</h1>
      <Card className="card">
        <Card.Body>
          <User
            name="Fullname"
            inputType="text"
            onInputChange={handleInputChange}
            arrName="fullName"
          />
          <User
            name="Email Address"
            inputType="email"
            onInputChange={handleInputChange}
            arrName="email"
          />
          <User
            name="Password"
            inputType="password"
            onInputChange={handleInputChange}
            arrName="password"
          />
           <User
            name="Confirm"
            inputType="password"
            onInputChange={handleInputChange}
            arrName="confirmPassword"
          />
          <User
            name="Mobile"
            inputType="text"
            onInputChange={handleInputChange}
            arrName="mobile"
          />
          <ReusableButton
            text={signUpInfo.pending ? <Loader /> : "Signup"}
            value={userData}
            onClick={handleButtonClick}
          />
          <ReusableLink
            option="Already have an account"
            action="Login"
            to="/login"
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default Signup;
