import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import Container from '../../components/Shared/Container'
import PendingReqCart from '../Home/pendingRequest/PendingReqCart'

const PendingDonationRequest = () => {

      // const axiosSecure = useAxiosSecure()
     const {data: allpendingBloodReq = [] ,isLoading} = useQuery({
     queryKey: ['allpendingBloodReq'],
    queryFn : async ()=> {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/pending-blood-req`)
      return result.data
    }
  })
 
  if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div className="py-16 bg-[#fdfdfd]">
      <Container>
        <div className="max-w-6xl mx-auto px-4 font-sans">
          
          {/* Header Section */}
          <div className="mb-12 text-center relative">
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight text-brand-red">
              Emergency <span className="text-slate-800">Feed</span>
            </h1>
            <div className="h-1.5 w-24 mx-auto rounded-full mb-4 bg-brand-blue"></div>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Real-time donation requests. Your small contribution can be a massive lifeline.
            </p>
          </div>

          {/* Grid Container */}
          {allpendingBloodReq.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allpendingBloodReq.map(request => (
                <PendingReqCart key={request._id} request={request} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center p-12 rounded-3xl border-2 border-dashed border-brand-blue bg-brand-blue-light">
              <p className="text-slate-500 font-medium italic">
                No emergency requests at the moment.
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default PendingDonationRequest
