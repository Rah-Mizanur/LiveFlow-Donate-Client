import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import MyDonationRequestRow from "../../../../components/Dashboard/TableRows/MyBloodRequestRow/MyDonationRequestRow";
import { useForm } from "react-hook-form";

const AllBloodDonationRequest = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const brandRed = "#e25843";
  const brandBlue = "#bbd7e3";
 const {
    register,
    handleSubmit,
 
    formState: { errors },
  } = useForm();
  
  const [filter, setFilter] = useState({
    bloodGroup: "",
    status: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Fetch all blood requests with current filters
const { data: allBloodReq = [], isLoading, refetch } = useQuery({
  queryKey: ["allBloodReq", filter],
  queryFn: async () => {
    // Using axios params object is the safest way to handle '+' characters
    const result = await axiosSecure.get('/all-blood-req', {
      params: {
        bloodGroup: filter.bloodGroup, // Axios will encode '+' to '%2B'
        status: filter.status
      }
    });
    return result.data;
  },
});
  console.log(allBloodReq)
  // Handle filter submission
  const onSubmit = (data) => {
    setFilter({
      bloodGroup: data.bloodGroup || "",
      status: data.status || "",
    });
  };
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
        
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-800">
              Blood Donation <span style={{ color: brandRed }}>Requests</span>
            </h1>
            <p className="text-gray-500">
              Search and manage all active life-saving requests.
            </p>
          </div>

        
          <div
            className="p-6 rounded-2xl mb-8 shadow-sm border flex flex-wrap gap-6 items-end bg-white"
            style={{ borderColor: brandBlue }}
          >
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Blood Group
              </label>
              <select
                 {...register("bloodGroup")}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 outline-none"
                style={{ "--tw-ring-color": brandRed }}
              >
                <option value="">Select Blood Group</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
              </select>
            </div>



            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Status
              </label>
              <select
              {...register('status')}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 outline-none"
                style={{ "--tw-ring-color": brandRed }}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
                <option value="cancel">Cancel</option>
              </select>
            </div>

            <button
              className="px-8 py-3 rounded-xl text-white font-bold transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: brandRed }}
              onClick={handleSubmit(onSubmit)}
            >
              Filter Results
            </button>
          </div>
        </div>

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
                    <MyDonationRequestRow
                      key={request._id}
                      request={request}
                    ></MyDonationRequestRow>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllBloodDonationRequest;
