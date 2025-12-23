import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { FaHeart } from 'react-icons/fa';
import axios from "axios";
const PaymentModal = ({ closeModal, isOpen }) => {
    const {user} = useAuth()

    const [paymentAmount , setPaymentAmout] = useState(null)
  const handleDonation = async() => {
    const donationInfo = {
        donor : user?.displayName,
        donorEmail : user?.email,
        amount : paymentAmount
    }
 const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/create-checkout-session`,donationInfo)
    window.location.href=data.url
    console.log(data.url)
  };

  return (
  <Transition grow show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 focus:outline-none" onClose={closeModal}>
        {/* Background overlay with better blur */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md" aria-hidden="true" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <DialogPanel className="w-full max-w-md bg-white p-8 shadow-2xl rounded-3xl border border-brand-blue/30 relative overflow-hidden">
                
                {/* Top Decorative Element */}
                <div className="absolute top-0 left-0 w-full h-2 bg-brand-red"></div>

                {/* Pulsing Icon Section */}
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-brand-blue-light">
                    <FaHeart className="text-3xl text-brand-red animate-pulse" />
                  </div>
                </div>

                <DialogTitle
                  as="h3"
                  className="text-2xl font-black text-center leading-6 text-slate-800 mb-2"
                >
                  Make a <span className="text-brand-red">Difference</span>
                </DialogTitle>
                <p className="text-center text-slate-500 text-sm mb-8">
                  Your donation helps keep the flow of life going.
                </p>

                {/* User Info Card */}
                <div className="space-y-3 bg-brand-blue-light p-4 rounded-2xl mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-slate-600">Donor:</span>
                    <span className="text-slate-800 font-medium">{user?.displayName}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-t border-brand-blue/30 pt-3">
                    <span className="font-bold text-slate-600">Email:</span>
                    <span className="text-slate-800 font-medium">{user?.email}</span>
                  </div>
                </div>

                {/* INPUT FIELD SECTION */}
                <div className="mt-6">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 ml-1">
                    Donation Amount (BDT)
                  </label>
                  <div className="relative group">
                     <span className="absolute text-xl left-4 top-[46%] -translate-y-1/2 text-slate-400 font-extrabold">৳</span>
                     <input
                      type="number"
                      min={1}
                      onChange={(e) => setPaymentAmout(e.target.value)}
                      className="w-full pl-8 pr-4 py-4 border-2 border-gray-100 rounded-2xl focus:border-brand-red focus:ring-0 focus:outline-none transition-all text-lg font-bold text-slate-800 placeholder:font-normal placeholder:text-slate-300"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>

                {/* BUTTONS SECTION */}
                <div className="flex mt-10 gap-4">
                  <button
                    onClick={handleDonation}
                    type="button"
                    className=" cursor-pointer inline-flex justify-center rounded-2xl bg-brand-red px-6 py-4 text-sm font-black text-white hover:opacity-90 transition-all shadow-lg shadow-brand-red/30 active:scale-95"
                  >
                    Confirm Payment
                  </button>
                  <button
                    type="button"
                    className="flex-1 cursor-pointer inline-flex justify-center rounded-2xl bg-slate-100 px-6 py-4 text-sm font-bold text-slate-500 hover:bg-slate-200 transition-all active:scale-95"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PaymentModal;
