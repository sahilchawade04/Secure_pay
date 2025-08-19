import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";

export default function TransactionModal({
  open,
  setOpen,
  receiver,
  receiverName,
  sender,
  currentBalance,
}) {
  const [amount, setAmount] = useState();
  const [pin, setPin] = useState();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const submitHandler = () => {
    setAmount("");
    setPin("");
    toast.promise(
      fetch("http://localhost:5000/admin/transaction", {
        method: "POST",
        body: JSON.stringify({ sender, receiver, amount, pin }),
        headers: {
          Authorization: `Bearer ${localStorage.token}`,  
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.status) {
            localStorage.setItem("amount", data.amount);
            return <b>{data.message}</b>;
          } else {
            throw new Error(data.message);
          }
        }),
      {
        loading: "processing...",
        success: (message) => message,
        error: (error) => <b>{error.message}</b>,
      }
    );
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-3xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full">
                      <div className="flex justify-between w-full m-2">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-3xl bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            data-slot="icon"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </div>
                        <div className="flex items-center justify-center w-full">
                          <Dialog.Title
                            as="h3"
                            className="text-center text-2xl md:4xl lg:text-4xl font-bold leading-7 text-gray-900"
                          >
                            Payment Details
                          </Dialog.Title>
                        </div>
                      </div>

                      <div className="md:mt-10 md:ml-10 m-5 text-xl font-semibold">
                        <div className="text-red-700 tracking-wide">
                          <span className="text-black">
                            Your current balance -{" "}
                          </span>
                          <span className="font-bold">₹{currentBalance}</span>
                        </div>

                        <div className="text-red-700 mt-5 tracking-wide">
                          <span className="text-black">Paying to - </span>{" "}
                          <span className="font-bold ml-8">{receiverName}</span>
                        </div>

                        <div className="mt-5">
                          <label htmlFor="amount">Enter amount - </label>
                          <input
                            className="rounded-xl p-2"
                            id="amount"
                            type="number"
                            placeholder="Enter amount..."
                            onChange={(e) => setAmount(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mt-5">
                          <label htmlFor="PIN">Enter PIN - </label>
                          <input
                            className="rounded-xl ml-9 p-2"
                            id="PIN"
                            type="number"
                            placeholder="Enter PIN..."
                            onChange={(e) => setPin(e.target.value)}
                            required
                          />
                        </div>
                        <div className="">
                          <p className="text-gray-600 text-sm mt-2 tracking-wide font-cabin">
                            Retrieve Your PIN from the Dashboard!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex item-center justify-center">
                  <p className="text-red-600 text-sm mt-2 tracking-wide font-cabin p-2">
                    This transaction will result in a debit from your
                    account!
                  </p>
                </div>
                <div className="bg-gray-50 px-4 py-3 ">
                  <div className="sm:flex sm:flex-row-reverse sm:px-6 items-center justify-center">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        submitHandler();
                        setOpen(!open);
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(!open)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
