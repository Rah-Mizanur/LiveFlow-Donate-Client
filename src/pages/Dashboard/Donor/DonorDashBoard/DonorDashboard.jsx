import React from "react";
import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";

const DonorDashboard = () => {
  const { user } = useAuth();

  const recentRequests = [
    {
      _id: "req_101",
      recipientName: "Abdul Karim",
      recipientDistrict: "Dhaka",
      recipientUpazila: "Mirpur",
      donationDate: "2025-01-18",
      donationTime: "10:30 AM",
      bloodGroup: "A+",
      status: "pending",
      donorName: null,
      donorEmail: null,
    },
    {
      _id: "req_102",
      recipientName: "Rahima Akter",
      recipientDistrict: "Chattogram",
      recipientUpazila: "Pahartali",
      donationDate: "2025-01-20",
      donationTime: "02:00 PM",
      bloodGroup: "O-",
      status: "inprogress",
      donorName: "Mizanur Rahman",
      donorEmail: "mizanur@gmail.com",
    },
    {
      _id: "req_103",
      recipientName: "Hasan Mahmud",
      recipientDistrict: "Rajshahi",
      recipientUpazila: "Boalia",
      donationDate: "2025-01-22",
      donationTime: "09:00 AM",
      bloodGroup: "B+",
      status: "done",
      donorName: "Mizanur Rahman",
      donorEmail: "mizanur@gmail.com",
    },
  ];

  return (
    <div className="p-4 md:p-6">
      {/* Welcome Section */}
      <h2 className="text-xl md:text-2xl font-semibold mb-6">
        Welcome, {user?.name} 👋
      </h2>

      {/* Recent Donation Requests */}
      {recentRequests.length > 0 && (
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
                {recentRequests.map((request) => (
                  <tr key={request._id}>
                    <td>{request.recipientName}</td>

                    <td className="hidden md:table-cell">
                      {request.recipientDistrict}, {request.recipientUpazila}
                    </td>

                    <td>{request.donationDate}</td>

                    <td className="hidden md:table-cell">
                      {request.donationTime}
                    </td>

                    <td>{request.bloodGroup}</td>

                    <td className="capitalize">{request.status}</td>

                    {/* Donor info */}
                    <td className="hidden lg:table-cell">
                      {request.status === "inprogress" ? (
                        <>
                          <p>{request.donorName}</p>
                          <p className="text-xs text-gray-500">
                            {request.donorEmail}
                          </p>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex flex-col md:flex-row gap-1 md:gap-2">
                        {request.status === "inprogress" && (
                          <>
                            <button className="btn btn-xs btn-success">
                              Done
                            </button>
                            <button className="btn btn-xs btn-warning">
                              Cancel
                            </button>
                          </>
                        )}

                        <Link
                          to={`/dashboard/edit-request/${request._id}`}
                          className="btn btn-xs btn-info"
                        >
                          Edit
                        </Link>

                        <button className="btn btn-xs btn-error">
                          Delete
                        </button>

                        <Link
                          to={`/dashboard/request/${request._id}`}
                          className="btn btn-xs btn-outline"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
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
  );
};

export default DonorDashboard;
