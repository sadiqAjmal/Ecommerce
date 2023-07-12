import React from "react";
import properties from "../AuthPage/properties";
import UserPage from "../AuthPage";

function LoginPage() {
  return (
    <UserPage {...properties.LoginInfo} />
  );
}

export default LoginPage;
