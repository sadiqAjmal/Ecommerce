import React from "react";
import properties from "../AuthPage/properties";
import UserPage from "../AuthPage";

function SignUpPage() {
  return (
    <UserPage {...properties.SignUpInfo} />
  );
}

export default SignUpPage;
