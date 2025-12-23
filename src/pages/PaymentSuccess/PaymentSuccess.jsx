import axios from 'axios'
import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router'
import { IoBagCheckOutline } from 'react-icons/io5'
import { FaHeartCircleCheck } from 'react-icons/fa6'
const PaymentSuccess = () => {
    const [searchParams ,setSearchParams]= useSearchParams()
    const sessionId= searchParams.get('session_id')

    useEffect(()=>{
        if(sessionId){
             axios.post(`${import.meta.env.VITE_API_URL}/payment-success`,{sessionId})
        }
    })
    console.log(sessionId)
  return (
      <div className='min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4'>
      <div className='bg-white p-10 md:p-16 rounded-3xl shadow-xl shadow-slate-200 border border-brand-blue/20 text-center max-w-lg w-full relative overflow-hidden'>
        
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-brand-red"></div>

        {/* Success Icon */}
        <div className="mb-6 inline-block p-5 rounded-full bg-brand-blue-light">
          <FaHeartCircleCheck className='w-16 h-16 text-brand-red animate-bounce' />
        </div>

        <h1 className='text-3xl md:text-4xl font-black text-slate-800 mb-4 uppercase tracking-tight'>
          Donation <span className='text-brand-red'>Received!</span>
        </h1>
        
        <p className='text-slate-600 mb-8 leading-relaxed font-medium'>
          Thank you for choosing <span className="font-bold text-slate-800">LiveFlow Donate</span>. 
          Your contribution is already being put to work to save lives across the community.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Main Action: Go Home */}
          <Link
            to='/'
            className='inline-block bg-brand-red text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 transition duration-300 shadow-lg shadow-brand-red/30 active:scale-95'
          >
            Go Home
          </Link>

          {/* Secondary Action: View History */}
          <Link
            to='/funding'
            className='inline-block bg-brand-blue-light text-slate-700 font-bold py-3 px-8 rounded-xl hover:bg-brand-blue/40 transition duration-300 active:scale-95 border border-brand-blue/30'
          >
            Donation History
          </Link>
        </div>
        
        <p className="mt-8 text-xs text-slate-400 font-bold uppercase tracking-widest">
          Transaction Confirmed
        </p>
      </div>
    </div>
  )
}

export default PaymentSuccess
