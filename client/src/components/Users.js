import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import TransactionModal from "./TransactionModal";
import { TailSpin } from "react-loader-spinner";
import ErrorPage from "./ErrorPage";
import { useNavigate } from "react-router-dom";
import transaction_1 from "../images/transaction_1.jpg";
import transaction_2 from "../images/transaction_2.jpg";



const Users = ({ senderAmount, isAuthenticated, userEmail }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const email = localStorage.getItem("email");
  const currentBalance = localStorage.getItem("amount");
  

  // Scroll to the top of the page when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //scroll to the particular div
  const targetDivRef = useRef(null);

  const scrollToTargetDiv = () => {
    targetDivRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://securepay-04-api.onrender.com/admin/availableUsers",
          {
            method: "GET",
            headers: {
              email,
              Authorization: `Bearer ${localStorage.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (response.status === 401) {
          setError({ message: "jwt token expired" });
        } else {
          setUsers(data);
        }

        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [email]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

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

      {/* div 1 */}
      <div class="m-1 md:m-4 h-auto md:h-screen flex flex-col md:flex-row justify-between p-4">
        <div class="md:w-1/2">
          <div class="font-cabin mt-28">
            <p class="text-3xl md:text-5xl font-semibold text-black">
              Embark on an Exciting Journey within Our Vibrant Network of Users.
              Each Ready and Eager for{" "}
              <span className="text-[#7ec743] rounded-full">
                Seamless Transactions.
              </span>
            </p>
            <div className="flex items-center justify-center">
              <button className="mt-6" onClick={scrollToTargetDiv}>
                <button className="relative inline-block text-sm font-medium text-green-400 group active:text-grreen-500 focus:outline-none">
                  <span className="absolute inset-0 transition-transform translate-x-0 translate-y-1 rounded-full bg-green-500 group-hover:translate-y-1 group-hover:translate-x-0"></span>
                  <span className="relative transition-all ease-in-out block translate-x-1 px-8 py-3 bg-black rounded-full border border-current hover:translate-y-1 hover:translate-x-0">
                    <button className="text-white tracking-wide font-cabin">Available Users</button>
                  </span>
                </button>
              </button>
            </div>
          </div>
        </div>
        <div class="md:w-1/2 md:ml-4">
          <img
            src={transaction_1}
            alt=""
            class="w-[600px]"
          />
        </div>
      </div>

      {/* border */}
      <div class="border bg-black mx-10" ref={targetDivRef}></div>

      {/* div 2 (Available users) */}
      <div className="bg-gradient-to-t from-[#b5e4f3] to-[#fef9d7] min-h-screen mx-4 my-8 rounded-2xl shadow-xl p-4">
        <div className="flex items-center justify-center p-5">
          <h1 className="text-3xl md:text-5xl font-semibold text-black font-cabin">
            Available Users to Transact
          </h1>
        </div>

        <div className="grid grid-cols-1 mt-10  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {loading ? (
            <div className="flex items-center justify-center col-span-full">
              <TailSpin />
            </div>
          ) : (
            users.map((user, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all ease-in-out p-3 cursor-pointer transform hover:scale-105"
                onClick={() => handleUserClick(user)}
              >
                <div className="flex items-center relative">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.image}
                    alt="User"
                  />
                  <div>
                    <span className="absolute w-3 h-3 left-5 top-5 bg-green-400 rounded-full">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {user.firstName} {user.lastName}
                    </h3>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedUser && (
          <TransactionModal
            open={open}
            setOpen={setOpen}
            receiver={selectedUser.email}
            receiverName={`${selectedUser.firstName} ${selectedUser.lastName}`}
            sender={email}
            senderAmount={senderAmount}
            currentBalance={currentBalance}
          />
        )}
      </div>

      {/* div 3 */}
      <div class="m-5">
        <div class="flex flex-col-reverse md:flex-row justify-between p-4">
          <div class="md:w-1/2 mb-4 md:mb-0 mt-10 md:mt-0">
            <img
              src={transaction_2}
              alt=""
              class=""
            />
          </div>
          <div class="md:w-1/2 md:ml-4 mt-4 md:mt-0  flex flex-col justify-center items-center">
            <p class="text-3xl md:text-5xl font-semibold text-black font-cabin">
              After completing transactions, users can <span className="text-[#ff3d46] rounded-3xl">review their Ledger</span> to
              gain valuable financial insights.
            </p>
            <button
              className="mt-5"
              onClick={() => {
                navigate("/passbook");
              }}
            >
              <button className="relative inline-block text-sm font-medium text-green-400 group active:text-grreen-500 focus:outline-none">
                <span className="absolute inset-0 transition-transform translate-x-0 translate-y-1 rounded-full bg-green-500 group-hover:translate-y-1 group-hover:translate-x-0"></span>
                <span className="relative transition-all ease-in-out block translate-x-1 px-8 py-3 rounded-full bg-black border border-current hover:translate-y-1 hover:translate-x-0">
                  <button className="text-white tracking-wide font-cabin">View Ledger</button>
                </span>
              </button>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
