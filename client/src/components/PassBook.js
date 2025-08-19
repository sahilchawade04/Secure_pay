import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import ErrorPage from "./ErrorPage";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import passbook_1 from "../images/passbook_1.jpg";
import passbook_2 from "../images/passbook_2.jpg";
import passbook_3 from "../images/passbook_3.jpg";

const PassBook = ({ userEmail, isAuthenticated }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [ledger, setLedger] = useState([]);
  const [error, setError] = useState(null);

  // Scroll to the top of the page when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //scroll to particular div
  const targetDivRef = useRef(null);
  const scrollToTargetDiv = () => {
    targetDivRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetch("http://localhost:5000/admin/ledger", {
      method: "GET",
      headers: {
        email: userEmail,
        authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("jwt token expired");
          } else {
            throw new Error("Network response was not ok");
          }
        }

        return res.json();
      })
      .then((data) => {
        setLedger(data);
        setLoading(false);

        return data;
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [userEmail]);

  if (error) {
    localStorage.clear();
    return (
      <ErrorPage
        errormessage={"Your session has timed out. Please log in again."}
      />
    );
  }

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} userEmail={userEmail} />

      <div className="min-h-screen overflow-y-auto">
        {/* div 1 */}
        <div class="m-1 md:m-4 h-auto md:h-screen flex flex-col md:flex-row justify-between p-4">
          <div class="md:w-1/2">
            <div class="mt-16 font-cabin">
              <p class="text-3xl md:text-7xl font-semibold text-black">
                Explore your{" "}
                <span class="text-[#30c2ae] rounded-full">passbook</span> to track
                your expenditures.
              </p>
              <p class="leading-loose text-gray-800 mt-5">
                Stay consistently informed about your account activity, ensuring
                you have a clear understanding of your financial transactions
                and their impact on your overall financial health.
              </p>
              <div className="flex items-center justify-center">
                <button className="mt-5" onClick={scrollToTargetDiv}>
                  <button className="relative inline-block text-sm font-medium text-green-400 group active:text-grreen-500 focus:outline-none">
                    <span className="absolute inset-0 transition-transform translate-x-0 translate-y-1 rounded-full bg-green-500 group-hover:translate-y-1 group-hover:translate-x-0"></span>
                    <span className="relative transition-all ease-in-out block translate-x-1 px-8 py-3 rounded-full bg-black border border-current hover:translate-y-1 hover:translate-x-0">
                      <button className="text-white tracking-wide font-cabin">Your Passbook</button>
                    </span>
                  </button>
                </button>
              </div>
            </div>
          </div>
          <div class="md:w-1/2 md:ml-4 mt-8">
            <img
              src={passbook_1}
              alt=""
              class="w-[600px]"
            />
          </div>
        </div>

        {/* Divider  */}
        <div class="border bg-black m-6" ref={targetDivRef}></div>

        {/* div 2 */}
        <div class="md:p-2">
          {loading ? (
            <div className="flex items-center justify-center">
              <TailSpin />
            </div>
          ) : ledger.length ? (
            <div className="overflow-hidden drop-shadow-md  transition-shadow ease-in-out">
              <h1 className="font-medium font-cabin text-5xl md:p-4 mb-5 md:text-6xl flex items-center justify-center text-gray-600 drop-shadow-sm">
                Passbook
              </h1>
              <div className="overflow-x-auto rounded-3xl">
                <table className="w-full text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-600">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Id
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Sender
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Receiver
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ledger
                      .slice()
                      .reverse()
                      .map((ledgerItem, index) => (
                        <tr
                          key={index}
                          className="bg-white text-black border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4">{ledgerItem.sender}</td>
                          <td className="px-6 py-4">{ledgerItem.receiver}</td>
                          <td
                            className={`px-6 py-4 ${
                              ledgerItem.message === "Insufficient Balance"
                                ? "text-red-400"
                                : "text-green-400"
                            }`}
                          >
                            {ledgerItem.message}
                          </td>
                          <td className="px-6 py-4">₹{ledgerItem.amount}</td>
                          <td className="px-6 py-4">{ledgerItem.Time}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className=" mt-5 mb-5 md:mt-10 md:mb-10 flex flex-col md:flex-row justify-center items-center">
              <div className="md:w-1/2 m-10">
                <p className="text-3xl md:text-6xl font-semibold text-black font-cabin">
                  <span className="bg-gray-200 rounded-full">
                    No transactions
                  </span>{" "}
                  have been made yet,
                  <br />
                  but every journey starts with a single step.
                </p>
                <div className="flex justify-center mt-5">
                  <button
                    className="mt-5"
                    onClick={() => {
                      navigate("/transaction");
                    }}
                  >
                    <button className="relative inline-block text-sm font-medium text-green-400 group active:text-grreen-500 focus:outline-none">
                      <span className="absolute inset-0 transition-transform translate-x-0 translate-y-1 rounded-full bg-green-500 group-hover:translate-y-1 group-hover:translate-x-0"></span>
                      <span className="relative transition-all ease-in-out block translate-x-1 px-8 py-3 rounded-full bg-black border border-current hover:translate-y-1 hover:translate-x-0">
                        <button className="text-white tracking-wide font-cabin">
                          Initiate your first transaction
                        </button>
                      </span>
                    </button>
                  </button>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src={passbook_2}
                  alt=""
                  className="h-[400px] "
                />
              </div>
            </div>
          )}
        </div>

        {/* Divider  */}
        <div class="border bg-black m-4"></div>

        {/* div 3 */}
        <div class="m-5">
          <div class="flex flex-col-reverse md:flex-row justify-between p-4">
            <div class="md:w-1/2 mb-4 md:mb-0 mt-10 md:mt-0">
              <img
                src={passbook_3}
                alt=""
                class=""
              />
            </div>
            <div class="md:w-1/2 md:ml-4 mt-4 md:mt-0  flex flex-col justify-center items-center">
              <p class="text-3xl md:text-5xl font-semibold text-black font-cabin">
                Explore further transactions on our{" "}
                <span className="text-yellow-500 rounded-full">
                  Transactions page
                </span>{" "}
                and elevate your financial experience with just a tap!
              </p>
              <button
                className="mt-5"
                onClick={() => {
                  navigate("/transaction");
                }}
              >
                <button className="relative inline-block text-sm font-medium text-green-400 group active:text-grreen-500 focus:outline-none">
                  <span className="absolute inset-0 transition-transform translate-x-0 translate-y-1 rounded-full bg-green-500 group-hover:translate-y-1 group-hover:translate-x-0"></span>
                  <span className="relative transition-all ease-in-out block translate-x-1 px-8 py-3 rounded-full bg-black border border-current hover:translate-y-1 hover:translate-x-0">
                    <button className="text-white tracking-wide font-cabin">Transaction page</button>
                  </span>
                </button>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassBook;
