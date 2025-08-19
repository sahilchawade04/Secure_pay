import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ErrorPage from "../components/ErrorPage";
import { TailSpin } from "react-loader-spinner";
import Chart from "chart.js/auto";
import { LuEye, LuEyeOff  } from "react-icons/lu";
import dashboard_img from "../images/dashboard.jpg"

 
const Dashboard = ({ userEmail, amount, isAuthenticated, paymentPin }) => {

  const navigate = useNavigate();
  const [ledger, setLedger] = useState([]);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hideEye, setHideEye] = useState(false); 
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  

  // Scroll to the top of the page when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch("https://securepay-04-api.onrender.com/admin/ledger", {
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

        let totalCredit = 0;
        let totalDebit = 0;

        ledger.forEach(transaction => {
            if (transaction.message === "Transaction Successfull") {
                if (transaction.sender === (firstName + ' ' + lastName)) {
                    totalDebit += parseFloat(transaction.amount);
                } else if (transaction.receiver === (firstName + ' ' + lastName)) {
                    totalCredit += parseFloat(transaction.amount);
                }
            }
        });

        setLoading(false);
        setTotalDebit(totalCredit);
        setTotalCredit(totalDebit);

        return data;
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [firstName, lastName, userEmail, ledger]);

  // pie-chart hook
  useEffect(() => {
    const data = [
      { label: "Total Credit", value: totalCredit },
      { label: "Total Debit", value: totalDebit },
    ];

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Check if there's a previous chart instance and destroy it
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create a new chart instance
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: data.map((item) => {
            return `${item.label}: ₹${item.value}`;
          }),
          datasets: [
            {
              // label: 'Acquisitions by year',
              data: data.map((item) => item.value),
              backgroundColor: [
                "#75ec5c", // Starting color
                "#7cc0d8", // Ending color
              ],
              fill: "origin",
              borderWidth: 1,
            },
          ],
        },
      });
    }
  }, [totalCredit, totalDebit]);

  

  if (error) {
    localStorage.clear();
    return (
      <ErrorPage
        errormessage={"Your session has timed out. Please log in again. "}
      />
    );
  }

  return (
    <div>
      {/* navbar */}
      <Navbar isAuthenticated={isAuthenticated} userEmail={userEmail} />

      <div className=" m-5 rounded-3xl">
        <div className="p-5">
          <div className="bg-gray-50 rounded-3xl p-5 drop-shadow-xl flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-1/2">
              <div className="leading-none text-3xl md:text-6xl font-bold text-gray-900 dark:text-white pb-2">
                Welcome, {firstName}
              </div>
              <div className="leading-none mt-5 text-3xl md:text-5xl font-bold text-gray-900 dark:text-white pb-2">
                Balance - ₹{amount}
              </div>
              
              <div className="flex leading-none mt-5 text-2xl md:text-4xl font-bold text-gray-900 dark:text-white pb-2">
                Payment PIN - {!hideEye ? '*******' : paymentPin}
                <div className="flex items-center ml-2 mt-1">
                  <button onClick={() => setHideEye( (hideEye) => !hideEye)}>
                  {hideEye ? <LuEyeOff /> : <LuEye />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center  lg:items-start mt-5">
                <button
                  className="m-5 lg:ml-10"
                  onClick={() => {
                    navigate("/passbook");
                  }}
                >
                  <div className="relative inline-block text-sm font-medium text-green-400 group focus:outline-none">
                    <span className="absolute inset-0 transition-transform rounded-full translate-x-0 translate-y-1 bg-green-500 group-hover:translate-y-1 group-hover:translate-x-0"></span>
                    <span className="relative transition-all ease-in-out block translate-x-1 px-8 py-3 hover:bg-black bg-gray-900 border border-current hover:translate-y-1 hover:translate-x-0 rounded-full shadow-lg">
                      <button className="text-white tracking-wider">
                        Transaction Details
                      </button>
                    </span>
                  </div>
                </button>

                <button
                  className="m-5 lg:ml-10"
                  onClick={() => {
                    navigate("/transaction");
                  }}
                >
                  <div className="relative inline-block text-sm font-medium text-green-400 group focus:outline-none">
                    <span className="absolute inset-0 transition-transform translate-x-0 translate-y-1 rounded-full bg-green-500 group-hover:translate-y-1 group-hover:translate-x-0"></span>
                    <span className="relative transition-all ease-in-out block translate-x-1 px-8 py-3 rounded-full hover:bg-black bg-gray-900 border border-current hover:translate-y-1 hover:translate-x-0 shadow-lg">
                      <button className="text-white tracking-wider">
                        Initiate Transaction
                      </button>
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* pie-chart */}
            <div className="">
              {totalDebit || totalCredit ? (
                <div className="h-200 w-220 bg-white rounded-3xl transition-all ease-in-out drop-shadow-md hover:drop-shadow-xl">
                  <canvas ref={chartRef}></canvas>
                </div>
              ) : (
                <div>
                  <img src={dashboard_img} alt="" className="h-80 rounded-3xl"/>
                </div>
              )}
            </div>
          </div>

          <div class="border bg-black mt-14"></div>

          <div className="mt-14">
            <div className="flex m-5">
            </div>
            {loading ? (
              <div className="flex items-center justify-center">
                <TailSpin />
              </div>
            ) : ledger.length ? (
              <>
                <h1 className="text-4xl font-bold text-gray-800 m-5">
                  Your Recent Transactions
                </h1>
                <div className="border-2 rounded-3xl overflow-hidden hover:drop-shadow-2xl transition-all ease-in-out">
                  <div className="overflow-x-auto">
                    <table className="overflow-x-auto w-full rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                      <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-600">
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
                          .slice(0, 5)
                          .map((ledgerItem, index) => (
                            <tr
                              key={index}
                              className="bg-white text-black border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                              <td className="px-6 py-4">{index + 1}</td>
                              <td className="px-6 py-4">{ledgerItem.sender}</td>
                              <td className="px-6 py-4">
                                {ledgerItem.receiver}
                              </td>
                              <td
                                className={`px-6 py-4 ${
                                  ledgerItem.message === "Insufficient Balance"
                                    ? "text-red-400"
                                    : "text-green-400"
                                }`}
                              >
                                {ledgerItem.message}
                              </td>
                              <td className="px-6 py-4">
                                ₹{ledgerItem.amount}
                              </td>
                              <td className="px-6 py-4">{ledgerItem.Time}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="mt-5 "
                    onClick={() => {
                      navigate("/passbook");
                    }}
                  >
                    <button className="relative inline-block text-sm font-medium text-green-400 group active:text-grreen-500 focus:outline-none">
                      <span className="absolute inset-0 transition-transform rounded-full translate-x-0 translate-y-1 bg-green-500 group-hover:translate-y-1 group-hover:translate-x-0"></span>
                      <span className="relative transition-all ease-in-out rounded-full block translate-x-1 px-8 py-3 hover:bg-black bg-gray-900 border border-current hover:translate-y-1 hover:translate-x-0">
                        <button className="text-white tracking-wider">
                          Show all transactions
                        </button>
                      </span>
                    </button>
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <h1 className="text-4xl font-bold font-cabin text-g2ray-800 mb-4">
                  No Recent Financial Engagements
                </h1>
                <button
                  className="mt-5"
                  onClick={() => {
                    navigate("/transaction");
                  }}
                >
                  <button className="relative inline-block text-sm font-medium text-green-400 group active:text-grreen-500 focus:outline-none">
                    <span className="absolute inset-0 transition-transform rounded-full translate-x-0 translate-y-1 bg-green-500 group-hover:translate-y-1 group-hover:translate-x-0"></span>
                    <span className="relative transition-all ease-in-out rounded-full block translate-x-1 px-8 py-3 hover:bg-black bg-gray-900 border border-current hover:translate-y-1 hover:translate-x-0">
                      <button className="text-white tracking-wider">
                        Initiate your first transaction
                      </button>
                    </span>
                  </button>
                </button>
              </div>
            )}
          </div>

          <br />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;