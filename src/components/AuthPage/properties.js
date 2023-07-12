var properties={ 
    LoginInfo :{
    info: [{name:"Enter email address",type:"email",arrName:"email"}, {name:"Password",type:"password",arrName:"password"}],
    options: [
      {
        option: "Forgot Password?",
        action: "Reset",
        to:'/reset'
      },
      {
        option: "Do not have an account",
        action: "SignUp",
        to:'/signUp'
      },
    ],
    action: "Login",
  },
  NewPass :{
    info: [{name:"New Password",type:"password",arrName:"newPass"}, {name:"Confirm Password",type:"password",arrName:"confirmPass"}],
    options: [
    ],
    action: "Reset Password",
  },
  SignUpInfo: {
    info: [{name:"Fullname" ,type:"fullName",arrName:"fullName"}, {name:"Email Address", type:"email",arrName:"email"}, {name:"Password",type:"password",arrName:"password"},{name: "Mobile",type:"mobile",arrName:"mobile"}],
    options: [
      {
        option: "Already have an account",
        action: "Login",
        to:'/login'
      },
    ],
    action: "SignUp",
  },
  forgotInfo:{
    info: [{name:"Enter Email Address",type:"email",arrName:"email"}],
    options: [
      {
        option: "No, I remember my password",
        action: "Login",
        to:'/login'
      },
    ],
    action: "Forgot Password",
  }
}
export default properties;