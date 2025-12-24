import React, { useState } from 'react'
import useAuth from '../../../../hooks/useAuth'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner'
import UsersDataRow from '../../../../components/Dashboard/TableRows/UsersDataRow'

const AllUsers = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  const [statusFilter, setStatusFilter] = useState('');
  const { data: allUsers = [], isLoading, refetch } = useQuery({
  queryKey: ['allUsers', statusFilter],
  queryFn: async () => {
    const result = await axiosSecure.get(`/all-users`, {
      params: { status: statusFilter }
    });
    return result.data;
  }
});


  if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold mb-6">All Users 👤</h2>

      {/* Filter */}
      <div className="flex gap-3 mb-4">
        <button onClick={()=>setStatusFilter('')} className={`px-4 py-2 rounded-md text-sm ${statusFilter === '' ? 'bg-brand-red text-white' : 'bg-brand-blue-light text-slate-700'}`}>
          All
        </button>
        <button onClick={()=>setStatusFilter('active')} className={`px-4 py-2 rounded-md text-sm ${statusFilter === 'active' ? 'bg-brand-red text-white' : 'bg-brand-blue-light text-slate-700'}`}>
          Active
        </button>
        <button onClick={()=>setStatusFilter('block')} className={`px-4 py-2 rounded-md text-sm ${statusFilter === 'block' ? 'bg-brand-red text-white' : 'bg-brand-blue-light text-slate-700'}`}>
          Blocked
        </button>

      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Avatar</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Update Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* Row */}
            {
              allUsers.map(webUser=><UsersDataRow key={webUser._id} webUser={webUser} user={user} refetch={refetch} ></UsersDataRow> )
            }
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;