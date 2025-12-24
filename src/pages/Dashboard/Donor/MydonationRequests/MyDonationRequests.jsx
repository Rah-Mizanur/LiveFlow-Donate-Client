import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import MyDonationRequestRow from "../../../../components/Dashboard/TableRows/MyBloodRequestRow/MyDonationRequestRow";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1); 
  const limit = 5; 

  const axiosSecure = useAxiosSecure();

  const {
    data: myBloodReqData = {},
    isLoading,
    refetch: statusRefetch,
  } = useQuery({
    queryKey: ["myBloodReq", user?.email, statusFilter, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/my-blood-req/${user.email}`,
        {
          params: { status: statusFilter, page, limit },
        }
      );
      return result.data; 
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h3 className="text-lg md:text-xl font-medium mb-4">
        My All Donation Requests
      </h3>

     
      <div className="flex gap-3 mb-4">
        {["", "pending", "inprogress", "done", "cancel"].map((status) => (
          <button
            key={status || "all"}
            onClick={() => {
              setStatusFilter(status);
              setPage(1); 
            }}
            className={`px-4 py-2 rounded-md text-sm ${
              statusFilter === status
                ? "bg-brand-red text-white"
                : "bg-brand-blue-light text-slate-700"
            }`}
          >
            {status === "" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
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
            {myBloodReqData.data?.map((request) => (
              <MyDonationRequestRow
                key={request._id}
                statusRefetch={statusRefetch}
                request={request}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {myBloodReqData.page || page} of {myBloodReqData.totalPages || 1}
        </span>
        <button
          onClick={() =>
            setPage((prev) =>
              prev < (myBloodReqData.totalPages || 1) ? prev + 1 : prev
            )
          }
          disabled={page === (myBloodReqData.totalPages || 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyDonationRequests;
