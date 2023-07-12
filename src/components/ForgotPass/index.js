import React from "react";
import properties from "../AuthPage/properties";
import UserPage from "../AuthPage";

function ResetPage() {
  return (
    <UserPage {...properties.forgotInfo} />
  );
}

export default ResetPage;
