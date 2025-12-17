import React from 'react'
import MyDonationRequestRow from '../../../../components/Dashboard/TableRows/MyBloodRequestRow/MyDonationRequestRow'
import { FaHandHoldingUsd, FaTint, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router'

const AdminDashboard = ({user,allBloodReq,myBloodReq,allUsers}) => {
  return (
    <div>  
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold">
          Welcome  
          <span className="capitalize text-red-500"> {user.displayName}</span>{" "}
          
        </h1>
        <p className="text-gray-600 mt-1">
          Here are overview of donors, funding, and blood donation requests.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users / Donors */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
          <div className="p-4 rounded-full bg-blue-100 text-blue-600 text-2xl">
            <FaUsers />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{allUsers.length}</h2>
            <p className="text-gray-600">Total Donors</p>
          </div>
        </div>

        {/* Total Funding */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
          <div className="p-4 rounded-full bg-green-100 text-green-600 text-2xl">
            <FaHandHoldingUsd />
          </div>
          <div>
            <h2 className="text-xl font-semibold">৳ 85,000</h2>
            <p className="text-gray-600">Total Funding</p>
          </div>
        </div>

        {/* Total Blood Donation Requests */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
          <div className="p-4 rounded-full bg-red-100 text-red-600 text-2xl">
            <FaTint />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{allBloodReq.length}</h2>
            <p className="text-gray-600">Blood Donation Requests</p>
          </div>
        </div>
      </div>
    </div>

    <div className="p-4 md:p-6">
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
     </div>
  )
}

export default AdminDashboard
