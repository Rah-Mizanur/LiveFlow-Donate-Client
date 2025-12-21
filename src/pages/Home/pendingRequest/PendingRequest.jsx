import React from 'react'
// import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import Container from '../../../components/Shared/Container'
import PendingReqCart from './PendingReqCart'
import axios from 'axios'
import { Link } from 'react-router'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const PendingRequest = () => {
    // const axiosSecure = useAxiosSecure()
     const {data: allpendingBloodReq = [] ,isLoading} = useQuery({
     queryKey: ['allpendingBloodReq'],
    queryFn : async ()=> {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/pending-blood-req`)
      return result.data
    }
  })
  

  const feedHome =allpendingBloodReq.slice(0,3)
  
  if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <Container>
        <div className="max-w-4xl mx-auto p-6 font-sans">
      {/* Header Section with your Banner Idea */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#e26048] mb-2">Donation Request</h1>
        <p className="text-gray-600">Give Blood, Save Lives, Keep the Flow Going.</p>
      </div>

      {/* The List Container */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        
        {/* 2. Mapping through your array */}
       {feedHome.map(request=> <PendingReqCart key={request._id} request={request}></PendingReqCart>)}
      </div>
      <div className='flex justify-center mt-5'>

     <Link
     to='/donation-requests'
     className='px-8 py-2 text-white rounded-xl hover:bg-amber-500 mt-2 bg-[#e26048]'> See All Blood Request </Link>
      </div>
    </div>
    </Container>
  )
}

export default PendingRequest
