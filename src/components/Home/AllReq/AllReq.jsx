import React, { useState } from 'react';

const AllDonationRequests = () => {
  const brandRed = "#e25843";
  const brandBlue = "#bbd7e3";

  // State for filters
  const [filter, setFilter] = useState({
    bloodGroup: '',
    district: '',
    status: ''
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        
       
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-800">
            Blood Donation <span style={{ color: brandRed }}>Requests</span>
          </h1>
          <p className="text-gray-500">Search and manage all active life-saving requests.</p>
        </div>

        {/* 2. Filter Bar (The "Admin-Style" logic) */}
        <div 
          className="p-6 rounded-2xl mb-8 shadow-sm border flex flex-wrap gap-6 items-end bg-white"
          style={{ borderColor: brandBlue }}
        >
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-700 mb-2">Blood Group</label>
            <select className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 outline-none" style={{ '--tw-ring-color': brandRed }}>
              <option value="">All Groups</option>
              <option value="A+">A+</option>
              <option value="O+">O+</option>
              {/* ... other groups */}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
            <select className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 outline-none" style={{ '--tw-ring-color': brandRed }}>
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <button 
            className="px-8 py-3 rounded-xl text-white font-bold transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: brandRed }}
          >
            Filter Results
          </button>
        </div>

        {/* 3. The Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead style={{ backgroundColor: brandBlue }} className="text-slate-800">
                <tr>
                  <th className="p-4 font-bold">Recipient</th>
                  <th className="p-4 font-bold">Location</th>
                  <th className="p-4 font-bold">Date & Time</th>
                  <th className="p-4 font-bold text-center">Blood Group</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Example Row */}
                <tr className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 font-semibold text-slate-700">Mizanur Rahman</td>
                  <td className="p-4 text-gray-600 text-sm">Bogura, Bangladesh</td>
                  <td className="p-4 text-gray-600 text-sm">25 Dec 2025, 10:00 AM</td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 rounded-lg font-bold bg-red-50" style={{ color: brandRed }}>
                      A+
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-yellow-100 text-yellow-700">
                      Pending
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      className="px-4 py-2 rounded-lg text-sm font-bold border transition-colors"
                      style={{ borderColor: brandRed, color: brandRed }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllDonationRequests;