import React from 'react'
import { Link } from 'react-router'
import MyDonationRequestRow from '../../../../components/Dashboard/TableRows/MyBloodRequestRow/MyDonationRequestRow'

const DonorDashboard = ({user,myBloodReq}) => {
  
  return (
    <div className="p-4 md:p-6">
         {/* Welcome Section */}
         <h2 className="text-xl md:text-2xl font-semibold mb-6">
           Welcome, {user?.displayName} 👋
         </h2>
   
         {/* Recent Donation Requests */}
         {myBloodReq.length > 0 && (
           <>
             <h3 className="text-lg md:text-xl font-medium mb-4">
               My Recent Donation Requests
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
                   {myBloodReq.map((request) => (
                     <MyDonationRequestRow key={request._id} request= {request}>
   
                     </MyDonationRequestRow>
                   ))}
                 </tbody>
               </table>
             </div>
   
             {/* View All Button */}
             <div className="mt-6 text-center md:text-left">
               <Link
                 to="/dashboard/my-donation-requests"
                 className="btn btn-primary"
               >
                 View My All Requests
               </Link>
             </div>
           </>
         )}
       </div>
  )
}

export default DonorDashboard
