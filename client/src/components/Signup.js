import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mainLogo from "../images/mainLogo.jpg"
import signupImg from "../images/signupimg.jpg"





const Signup = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function registerHandler(e) {
    e.preventDefault();

    fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.email && !data.error) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.email);
          localStorage.setItem("firstName", data.firstName);
          localStorage.setItem("lastName", data.lastName);
          localStorage.setItem("amount", data.amount);
          localStorage.setItem("paymentPin", data.paymentPin);
          localStorage.setItem("profileImg", data.image);
          window.location = "/dashboard";
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        toast.error("An unexpected error occurred. Please try again.");
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

    {/* Image and Registration Form */}
    <div className="flex flex-col-reverse md:flex-row overflow-hidden">
      <div className="md:w-1/2">
        {/* Image */}
        <img src={signupImg} alt="register" className="h-[560px]" />
      </div>

      <div className="md:w-1/2 flex items-center justify-center p-10">
          <div className="max-w-md w-[350px] space-y-8">
            <h1 className="text-3xl font-bold text-center">
              Register to your account
            </h1>
            <form className="space-y-4" onSubmit={registerHandler}>
              <div className="flex gap-7">
                <div>
                  <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex justify-center">
                <button type="submit" className="mt-5 place-content-center">
                  <button className="relative inline-block text-sm font-medium text-green-400 group active:text-grreen-500 focus:outline-none">
                    <span className="absolute inset-0 transition-transform translate-x-0 rounded-full translate-y-1 bg-green-500 group-hover:translate-y-1 group-hover:translate-x-0"></span>
                    <span className="relative transition-all ease-in-out block translate-x-1 rounded-full px-8 py-3 bg-black border border-current hover:translate-y-1 hover:translate-x-0">
                      <button className="text-white ">
                        Register
                      </button>
                    </span> 
                  </button>
                </button>
              </div>
            </form>
            <p className="text-sm font-light text-gray-600 dark:text-gray-500 flex justify-center">
              Already have an account?{" "}
              <button
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                onClick={() => navigate('/login')}
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
