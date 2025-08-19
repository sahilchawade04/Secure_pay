import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mainLogo from "../images/mainLogo.jpg"
import loginImg from "../images/Login_img.jpg"

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function  loginHandler(e) {
    e.preventDefault();

    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.email && !data.error) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("firstName", data.firstName);
          localStorage.setItem("lastName", data.lastName);
          localStorage.setItem("email", data.email);
          localStorage.setItem("amount", data.amount);
          localStorage.setItem("paymentPin", data.paymentPin);
          localStorage.setItem("profileImg", data.image);
          window.location = "/dashboard";
          return data;
        } else {
          toast.error(data.message);
          return;
        }
      });
  }

  return (
    <div>

      {/* Navbar */}
      <nav className="flex h-20 justify-between items-center bg-gray-50 px-4 py-2 drop-shadow-md ">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img
              src={mainLogo}
              className="w-10 h-10 rounded-full"
              alt="home logo"
            />
          </Link>
          <Link to="/" className="text-2xl font-cabin font-medium">
            Secure Pay
          </Link>
        </div>
        <div>
          <Link to="/" className="hover:underline text-gray-700 hover:text-black" >
            back to Home
          </Link> 
        </div>
      </nav>

      <div className="flex flex-col-reverse md:flex-row">
        <div className="md:w-1/2 ">
          <img src={loginImg} alt="login" className="w-[580px] h-[560px]" />
        </div>

        <div className="md:w-1/2 flex items-center justify-center p-10">
          <div className="max-w-md rounded-lg p-4 w-[350px] space-y-8">
            <h1 className="text-3xl font-bold text-center">Log In</h1>
            <form onSubmit={loginHandler} className="space-y-4">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-black dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  class="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@gmail.com"
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-black dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
                
                <div className="flex justify-center">
                  <button type="submit" class="mt-3">
                    <button class="relative inline-block text-sm font-medium text-green-500 group active:text-grreen-500 focus:outline-none">
                      <span class="absolute inset-0 transition-transform translate-x-0 translate-y-1 rounded-full bg-green-500 group-hover:translate-y-1 group-hover:translate-x-0"></span>

                      <span class="relative transition-all ease-in-out block translate-x-1 px-8 py-3 rounded-full bg-black border border-current hover:translate-y-1 hover:translate-x-0">
                        <button className="text-white ">Log in</button>
                      </span> 
                    </button>
                  </button>
                  
                </div>
                
                <div className="flex justify-center items-center pt-4">
                  <p >
                    <button onClick={() => {
                      navigate('/forgotPassword')
                    }} className="font-medium hover:underline hover:text-black dark:text-primary-500 text-gray-700">
                      forgot password?
                    </button>
                  </p>
                  
                </div>


            </form>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400 flex justify-center">
              Don’t have an account yet?{" "}
              <button
                class="font-medium text-primary-600 hover:underline hover:text-black dark:text-primary-500"
                onClick={() => {
                  navigate('/signup')
                }}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
