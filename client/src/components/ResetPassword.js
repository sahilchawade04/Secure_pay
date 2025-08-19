import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Navbar from "./Navbar";


const ResetPassword = () => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  
  function forgotPass(e) {
    e.preventDefault();
    setResponse("");
    setError("")
    setLoading(true)

    if(password !== confirmPassword){
      setLoading(false);
      setError("password does not match")
    }
    else{
      try{
        const token = searchParams.get("token");
        fetch("https://securepay-04-api.onrender.com/forgotPassword/reset", {
          method: "POST",
          body: JSON.stringify({password, token}),
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then(resp => resp.json())
        .then(data => {
          setLoading(false);
          setResponse(data)}
          )
        .catch(err => console.log(err))
      }
      catch(err){
        console.log(err);
      }
    }

  } 

  return (
    <div>
      {/* navbar */}
      <Navbar/>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex items-center justify-center px-6 py-16">
          <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Password
            </h2>
            <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  required=""
                />
              </div>
              <div>
                <label
                  for="text"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="text"
                  name="text"
                  id="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required=""
                />
              </div>
              <button
                type="submit"
                class="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-sky-400 hover:bg-sky-500"
                onClick={forgotPass}
              >
                Reset Password
              </button>
            </form>
            <div className="flex items-center justify-center mt-6">
              {loading && <TailSpin/>}
              {response &&
                <div className="flex flex-cols text-red-500 items-center justify-center mt-5 text-2xl font-semibold font-cabin">
                    <h4>{response.message}</h4>
                </div>
              }
            </div>
            <div>
              {error &&
              <div className="flex text-red-600 items-center justify-center mt-5 text-2xl font-semibold font-cabin">
                <h4>{error}</h4>
              </div>
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
