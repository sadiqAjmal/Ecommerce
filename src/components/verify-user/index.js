import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Navigate } from "react-router";
import { resetState, verifyUser } from "../../Redux/slices/auth-slice";
import Loader from "../loader";
import AlertModal from "../modal";
const VerifyUser=()=>{
    const navigate=useNavigate();
    const {token}=useParams();
    console.log(token);
    const info=useSelector((store)=>store.auth);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(verifyUser(token));
    },[])
    return(
        info.pending?<div style={{marginTop:'10%',marginLeft:'25%',width:'50%'}}>
            <Loader/>
        </div>:info.success?
        <AlertModal show={true} Title={"Success!"} Body={"User Verified Successfuly"} onHide={()=>{
            dispatch(resetState());
            navigate('/login');
        }}/>:<AlertModal show={true} Title={"Error!"} Body={"Token has Expired"} onHide={()=>{
            dispatch(resetState());
            navigate('/');
        }}/>
    )
}
export default VerifyUser;