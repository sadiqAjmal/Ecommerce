import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import '../style.css'
import User from "../user-input";
import ReusableButton from "../button";
import {useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { resetPass, resetState, verifyToken } from "../../../Redux/slices/auth-slice";
import AlertModal from "../../modal";
import Loader from "../../loader";
function NewPassword() {
  const [showModal,setShowModal]=useState(false);
  const navigate=useNavigate();
  const {token}=useParams();
  const [AlertBody,setAlertBody]=useState('');
  const [userData, setUserData] = useState({});
  const dispatch=useDispatch();
  const handleInputChange = (inputName, inputValue) => {
    setUserData({
      ...userData,
      [inputName]: inputValue,
    });
  };
  const handleButtonClick = async (event) => {
    event.preventDefault();
    console.log(userData.confirmPass,userData.newPass);
    if(userData.confirmPass===userData.newPass)
     {dispatch(resetPass({newPassword:userData.newPass,token:token}))
      .then(
        ()=>{
        navigate('/login')
        dispatch(resetState());
      }
      ).catch((err)=>{
        setShowModal(true);
        setAlertBody(err);
        dispatch(resetState());
      });}
      else
      {
       setShowModal(true);
       setAlertBody("Password does'nt match");
      }
  };
  useEffect(() => {
    dispatch(verifyToken(token));
  }, []); // Empty dependency array to ensure this effect runs only once
  const resetInfo=useSelector((store)=>store.auth);
  return (
   resetInfo.pending?<Loader/>: resetInfo.success?  <div>
       <AlertModal Title={"Error"} Body={AlertBody} show={showModal} onHide={()=>{setShowModal(false)}}/>
      <h1 className="h1">Reset Password</h1>
      <Card className="card">
        <Card.Body>
          <User
            name="New Password"
            inputType="password"
            onInputChange={handleInputChange}
            arrName="newPass"
          />
          <User
            name="Confirm Password"
            inputType="password"
            onInputChange={handleInputChange}
            arrName="confirmPass"
          />
          <ReusableButton
            text={resetInfo.pending?<Loader/>:"Reset Password"}
            value={userData}
            onClick={handleButtonClick}
          />
        </Card.Body>
      </Card>
    </div>
    :<div style={{marginTop:'20%',marginLeft:'35%'}}><h1>Your Token Has Expired</h1></div>
  );
}

export default NewPassword;
