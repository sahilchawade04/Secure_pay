import React  from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import NavbarDropdown from "./NavbarDropdown";
import mainLogo from "../images/mainLogo.jpg"



const Navbar = ({ isAuthenticated, userEmail }) => {

// console.log(import.process.env.)
  return (
    <div className="bg-white h-20 top-0 flex items-center sticky z-50 text-black drop-shadow-lg">
      <div className="px-4 w-screen flex items-center p-1 justify-between lg:px-8 md:px-4">

          <div className="flex gap-1">
            <Link to="/">
              <img className="h-10 w-10 rounded-lg" src={mainLogo} alt="main logo" />
            </Link>
            
            <a href="/" className="flex items-center justify-center">
              <p className="text-2xl font-cabin font-medium ">Secure Pay</p>
            </a>
          </div>

        {!isAuthenticated ? (
          <div>
            <div className="hidden md:flex text-md leading-6 font-semibold text-slate-700 dark:text-slate-200">
              <Link to="https://www.npci.org.in/blogs" target="_blank" className="mr-6 hover:text-black">
                Blog
              </Link>
              <Link to="https://www.npci.org.in/what-we-do/upi/product-overview" target="_blank" className="mr-6">
                UPI
              </Link>
              <Link to="https://www.npci.org.in/" target="_blank" className="mr-6">
                NPCI
              </Link>
              <Link to="/login" className="mr-6">
                Login
              </Link>
              <Link to="/signup" className="mr-6">
                Signup
              </Link>
            </div>
            <div className="visible md:hidden">
              <NavbarDropdown/>
            </div>
          </div>
        ) : (<Dropdown userEmail={userEmail}/>)}

        

      </div>
    </div>
  );
};

export default Navbar;
