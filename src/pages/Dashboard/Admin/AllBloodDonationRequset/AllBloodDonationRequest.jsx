import React from 'react'
import useAuth from '../../../../hooks/useAuth'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner'
import MyDonationRequestRow from '../../../../components/Dashboard/TableRows/MyBloodRequestRow/MyDonationRequestRow'

const AllBloodDonationRequest = () => {
   const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
      const {data: allBloodReq = [] ,isLoading} = useQuery({
     queryKey: ['allBloodReq'],
    queryFn : async ()=> {
      const result = await axiosSecure(`${import.meta.env.VITE_API_URL}/all-blood-req`)
      return result.data
    }
  })
  if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
      <div>
     {allBloodReq.length > 0 && (
        <>
          <h3 className="text-lg md:text-xl font-medium mb-4">
            All Donation Requests
          </h3>

          {/* Table Wrapper for Mobile */}
          <div className="overflow-x-auto">
            <table className="table w-full border text-sm md:text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th>Recipient</th>
                  <th className="hidden md:table-cell">Location</th>
                  <th>Date</th>
                  <th className="hidden md:table-cell">Time</th>
                  <th>Blood</th>
                  <th>Status</th>
                  <th className="hidden lg:table-cell">Donor Info</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {allBloodReq.map((request) => (
                  <MyDonationRequestRow key={request._id} request= {request}>
                    
                  </MyDonationRequestRow>
                ))}
              </tbody>
            </table>
          </div>

        
        </>
      )}
    </div>
  )
}

export default AllBloodDonationRequest
