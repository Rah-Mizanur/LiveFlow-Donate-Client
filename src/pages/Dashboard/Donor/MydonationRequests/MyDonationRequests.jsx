import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import MyDonationRequestRow from "../../../../components/Dashboard/TableRows/MyBloodRequestRow/MyDonationRequestRow";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import { Link } from "react-router";

const MyDonationRequests = () => {
  const { user } = useAuth();
  console.log(user?.email);
  const axiosSecure = useAxiosSecure();
  const {
    data: myBloodReq = [],
    isLoading,
    refetch: statusRefetch,
  } = useQuery({
    queryKey: ["myBloodReq", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/my-blood-req/${user.email}`
      );
      return result.data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      {myBloodReq.length > 0 && (
        <>
          <h3 className="text-lg md:text-xl font-medium mb-4">
            My All Donation Requests
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
                  <MyDonationRequestRow
                    key={request._id}
                    statusRefetch={statusRefetch}
                    request={request}
                  ></MyDonationRequestRow>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MyDonationRequests;
