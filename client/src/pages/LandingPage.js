import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import AnimatedNumbers from "react-animated-numbers";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Landing_1  from '../images/Landing_1.jpg'
import Landing_2  from '../images/Landing_2.jpg'
import Landing_3  from '../images/Landing_3.jpg'
import UPI_logo from '../images/UPI_logo.png'

const LandingPage = ({ isAuthenticated, userEmail }) => {
  const navigate = useNavigate();

  // Scroll to the top of the page when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const achievementsList = [
    {
      value: "300",
      postfix: "+",
      metric: "million UPI users",
    },
    {
      value: "18",
      postfix: "+",
      metric: "Billion Transaction volume",
    },
    {
      value: "7",
      postfix: "+",
      metric: "Countries adopted UPI",
    },
  ];

  return (
    <div className="landingPage ">
      <Navbar isAuthenticated={isAuthenticated} userEmail={userEmail} />

      {/* page 1 */}
      <div class="m-1 md:m-4 h-auto md:h-scresen flex flex-col md:flex-row justify-between p-4">
        <div class="md:w-3/4">
          <div class="mt-16 font-cabin">
            <p class="text-3xl md:text-7xl font-semibold text-black">
              Welcome to{" "}
              <span className="text-red-500  hover:text-red-700 transition-all ease-in-out rounded-full ">
                Secure & Streamlined
              </span>{" "}
              Transaction Gateway.
            </p>
            <p class="leading-loose text-gray-800 mt-5">
              Stay informed about your account activity, ensuring you have a
              clear understanding of your financial interactions and their
              impact on your overall financial health, all within our Secure &
              Streamlined Transaction Gateway.
            </p>
          </div>
          {!isAuthenticated ? (
            <div className="flex gap-10 items-center justify-center mt-10">
              <button onClick={() => navigate("/login")} class="mt-3">
                <button class="relative inline-block text-sm font-medium text-green-500 group active:text-grreen-500 focus:outline-none">
                  <span class="absolute inset-0 transition-transform translate-x-0 translate-y-1 rounded-full bg-green-500 group-hover:translate-y-1 group-hover:translate-x-0"></span>

                  <span class="relative transition-all ease-in-out block translate-x-1 px-8 py-3 rounded-full bg-black border border-current hover:translate-y-1 hover:translate-x-0">
                    <button className="text-white ">Log in</button>
                  </span>
                </button>
              </button>
              <button onClick={() => navigate("/signup")} class="mt-3">
                <button class="relative inline-block text-sm font-medium text-green-500 group active:text-grreen-500 focus:outline-none">
                  <span class="absolute inset-0 transition-transform translate-x-0 translate-y-1 rounded-full bg-green-500 group-hover:translate-y-1 group-hover:translate-x-0"></span>

                  <span class="relative transition-all ease-in-out block translate-x-1 px-8 py-3 rounded-full bg-black border border-current hover:translate-y-1 hover:translate-x-0">
                    <button className="text-white ">Register</button>
                  </span>
                </button>
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div class="md:ml-4 mt-16">
          <img
            src={Landing_1}
            alt=""
            class="w-[640px]"
          />
        </div>
      </div>

      {/* border */}
      <div class="border bg-black m-10"></div>

      {/* page 2 */}
      <div class="m-1 md:m-4 h-auto md:h-scresen flex flex-col md:flex-row justify-between p-4">
        <div class="md:ml-4 mt-16">
          <img
            src={Landing_2}
            alt=""
            class="w-[640px]"
          />
        </div>
        <div class="md:w-1/2">
          <div class="mt-16 font-cabin p-5">
            <p class="text-3xl tracking-wide md:text-5xl font-semibold text-black">
              India's digital transactions surged by a remarkable
              <a
                href="https://pib.gov.in/PressReleasePage.aspx?PRID=1988370#:~:text=The%20Minister%20further%20stated%20that,reached%2011%2C660%20crore%20till%2011.12."
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-[#55c396] hover:text-[#3a9b72] hover:underline transition-all ease-in-out">
                  {" "}
                  549.78%
                </span>
              </a>{" "}
              from FY 2017-18 to FY 2022-23.
            </p>
            <p class="leading-loose text-gray-800 mt-5">
              Total digital payment transactions volume increases from 2,071
              crore in FY 2017-18 to 13,462 crore in FY 2022-23 at a CAGR of
              45%.
            </p>
          </div>
        </div>
      </div>

      {/* border */}
      <div class="border bg-black m-10"></div>

      {/* page 3 -- animated number section */}
      <div className="h-scrseen ">
        <div className="absolute">
          <img
            src={UPI_logo}
            alt=""
            className="relative opacity-20"
          />
        </div>
        <div className="flex font-cabin tracking-wide items-center justify-center py-10 px-2 text-3xl md:text-5xl font-semibold">
          <p className="drop-shadow-md hover:drop-shadow-xl p-4 rounded-3xl bg-orange-400 hover:bg-orange-500 transition-all ease-in-out text-white">
            Unified Payment Interface(UPI) Milestones
          </p>
        </div>
        <div className="py-8 px-4  xl:gap-16 sm:py-16 xl:px-16">
          <div className="bg-green-400 hover:bg-green-500 drop-shadow-md hover:drop-shadow-xl transition-all ease-in-out rounded-3xl py-8 px-6 flex flex-col sm:flex-row items-center justify-between">
            {achievementsList.map((achievement, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0 rounded-lg p-6"
              >
                <h2 className="text-black text-4xl font-bold flex flex-row">
                  {achievement.prefix}
                  <AnimatedNumbers
                    includeComma
                    animateToNumber={parseInt(achievement.value)}
                    locale="en-US"
                    transitions={(index) => ({
                      duration: 3,
                    })}
                    className="text-black text-4xl font-bold"
                    fontStyle={{
                      color: "black",
                    }}
                  />
                  {achievement.postfix}
                </h2>
                <p className="text-black text-3xl font-cabin mt-3 font-medium">
                  {achievement.metric}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* border */}
      <div class="border bg-black m-10"></div>

      {/* page 4 */}
      <div class="m-1 md:m-4 h-auto md:h-scresen flex flex-col md:flex-row justify-between p-4">
        <div class="md:w-3/4">
          <div class="mt-16 font-cabin">
            <p class="text-3xl md:text-7xl font-semibold text-black">
              Explore and Transact, You'll be Credited with{" "}
              <span className="text-cyan-500 hover:text-cyan-600 transition-all ease-in-out rounded-full">1000 Rupees</span> to
              Begin!
            </p>
            <p class="leading-loose text-gray-800 mt-5">
              This is Not Actual Banking! You're Venturing into a Simulated
              Environment. Embrace the Experience as You Begin with a Generous
              Starting Credit of 1000 Rupees!
            </p>
          </div>
        </div>
        <div class="md:ml-4 mt-16">
          <img
            src={Landing_3}
            alt=""
            class="w-[850px]"
          />
        </div>
      </div>

      {/* border */}
      <div class="border bg-black m-10"></div>

      {/* ending section */}

      <Footer/>


    </div>
  );
};

export default LandingPage;
