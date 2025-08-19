import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from '../components/ErrorPage'
import Dashboard from "./Dashboard";
import Users from "../components/Users";
import LandingPage from "./LandingPage";
import Login from "../components/Login";
import Signup from "../components/Signup";
import PassBook from "../components/PassBook";
import ForgotPassword from "../components/ForgotPass";
import ResetPassword from "../components/ResetPassword";



const MainPage = () => {
  
  const isAuthenticated = localStorage.getItem("token");
  const userEmail = localStorage.getItem("email");
  const paymentPin = localStorage.getItem("paymentPin");
  const [amount, senderAmount] = useState(localStorage.getItem("amount"));
  

  return (
    <Router>
      <>
        <div>
          <Routes>
            <Route
              path={"/"}
              element={<LandingPage isAuthenticated={isAuthenticated} userEmail={userEmail}/>}
            />

            {isAuthenticated ? <Route path={"/login"} element={<ErrorPage errormessage={"invalid request"}/>} /> : <Route path={"/login"} element={<Login />} />}

            {isAuthenticated ? <Route path={"/signup"} element={<ErrorPage errormessage={"invalid request"}/>} /> : <Route path={"/signup"} element={<Signup />} />}
            
            {isAuthenticated ? <Route path={"/forgotPassword"} element={<ErrorPage errormessage={"invalid request"}/>} /> : <Route path={"/forgotPassword"} element={<ForgotPassword />} />}
            
            {isAuthenticated ? <Route path={"/forgotPassword/reset"} element={<ErrorPage errormessage={"invalid request"}/>} /> : <Route path={"/forgotPassword/reset"} element={<ResetPassword />} />}

            {isAuthenticated ? 
              (<Route
                path="/dashboard"
                element={<Dashboard userEmail={userEmail} amount={amount} isAuthenticated={isAuthenticated} paymentPin={paymentPin}/>}
              />)
             : (<Route path={"/dashboard"} element={<ErrorPage errormessage={"invalid request"}/>}/>)}

            {isAuthenticated && 
            (<Route
                path={"/transaction"}
                element={<Users senderAmount={senderAmount} isAuthenticated={isAuthenticated} userEmail={userEmail}/>}
              />)
            
            }

            {isAuthenticated ? (
              <Route path={"/passbook"} element={<PassBook userEmail={userEmail} isAuthenticated={isAuthenticated}/>}/>
            ) : (<Route path={"/passbook"} element={<ErrorPage errormessage={"invalid request"}/>}/>)}

          </Routes>
        </div>
      </>
    </Router>
  );
};

export default MainPage;
