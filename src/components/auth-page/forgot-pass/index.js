import React, { useEffect, useState, useCallback } from "react";
import { Card } from "react-bootstrap";
import "../style.css";
import User from "../user-input";
import ReusableLink from "../link";
import ReusableButton from "../button";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetState } from "../../../Redux/slices/auth-slice";
import Loader from "../../loader";
import AlertModal from "../../modal";

function ForgotPassword() {
  const forgotInfo = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [AlertBody, setAlertBody] = useState("");
  const [AlertTitle, setAlertTitle] = useState("");
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = useCallback((inputName, inputValue) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [inputName]: inputValue,
    }));
  }, []);

  const success = useCallback(() => {
    setShowModal(true);
    setAlertBody("We have sent you an email");
    setAlertTitle("Success");
    dispatch(resetState());
  }, [dispatch]);

  const error = useCallback(() => {
    setShowModal(true);
    setAlertBody("Please enter a valid email");
    setAlertTitle("Error!");
    dispatch(resetState());
  }, [dispatch]);

  const handleButtonClick = useCallback(
    (event) => {
      event.preventDefault();
      let { email } = userData;
      dispatch(forgotPassword(email));
    },
    [dispatch, userData]
  );

  useEffect(() => {
    if (forgotInfo.success) {
      success();
    } else if (forgotInfo.failed) {
      error();
    }
  }, [forgotInfo.success, forgotInfo.failed, success, error]);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
    setAlertBody("");
    setAlertTitle("");
  }, []);

  return (
    <div>
      <AlertModal
        Title={AlertTitle}
        Body={AlertBody}
        show={showModal}
        onHide={handleModalClose}
      />
      <h1 className="h1">Forgot Password</h1>
      <Card className="card">
        <Card.Body>
          <User
            name="Enter Email Address"
            inputType="email"
            onInputChange={handleInputChange}
            arrName="email"
          />
          <ReusableButton
            text={forgotInfo.pending ? <Loader /> : "Forgot Password"}
            value={userData}
            onClick={handleButtonClick}
          />
          <ReusableLink option="No, I remember my password" action="Login" to="/login" />
        </Card.Body>
      </Card>
    </div>
  );
}

export default ForgotPassword;
