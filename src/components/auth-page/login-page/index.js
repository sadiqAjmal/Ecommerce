import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "../style.css";
import User from "../user-input";
import ReusableLink from "../link";
import ReusableButton from "../button";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../loader";
import { useNavigate } from "react-router";
import { login, resetState } from "../../../Redux/slices/auth-slice";
import AlertModal from "../../modal";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const loginInfo = useSelector((store) => store.auth);
  const handleInputChange = (inputName, inputValue) => {
    setUserData({
      ...userData,
      [inputName]: inputValue,
    });
  };
  const handleButtonClick = (event) => {
    event.preventDefault();
    dispatch(login(userData));
  };
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  useEffect(() => {
    if (loginInfo.failed) {
      setAlertText(loginInfo.error);
      setAlertTitle("Error!");
      dispatch(resetState())
      setShowAlert(true);
    }
  }, [loginInfo.failed]);

  // Redirect to home page after successful login
  useEffect(() => {
    if (loginInfo.success) {
      navigate('/');
      dispatch(resetState());
    }
  }, [loginInfo.success]);

  return (
    <div>
      <AlertModal
        Title={alertTitle}
        Body={alertText}
        show={showAlert}
        onHide={() => {
          setShowAlert(false);
        }}
      />
      <h1 className="h1">Login</h1>
      <Card className="card">
        <Card.Body>
          <User
            name="Enter email address"
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
          <ReusableButton
            text={loginInfo.pending ? <Loader /> : "Login"}
            value={userData}
            onClick={handleButtonClick}
          />
          <ReusableLink option="Forgot Password?" action="Reset" to="/reset" />
          <ReusableLink
            option="Do not have an account"
            action="SignUp"
            to="/signup"
          />
        </Card.Body>
      </Card>
    </div>
  );
}
export default Login;
