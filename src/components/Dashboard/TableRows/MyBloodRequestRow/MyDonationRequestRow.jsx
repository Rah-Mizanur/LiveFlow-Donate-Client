import { Link } from "react-router";
import useDistrictUpazila from "../../../../hooks/useDistrictUpazila";
import { useState } from "react";
import UpdateStatusModal from "../../Modal/UpdateStatusModal";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useRole from "../../../../hooks/useRole";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const MyDonationRequestRow = ({ request, statusRefetch }) => {
  const { user } = useAuth();
  const { districtName, upazilaName } = useDistrictUpazila(
    request.recipientZila,
    request.recipientUpazila
  );
  const { role, isRoleLoading } = useRole();
  const axiosSecure = useAxiosSecure();
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const handleStatusDone = async () => {
    try {
      await axiosSecure.patch("/update-blood-status-done", {
        id: request._id,
        status: "done",
      });
      toast.success("Status Update Successfully");
      await statusRefetch();
    } catch (err) {
      toast("Something went Wrong ... Try Again ..");
      console.log(err);
    }
  };

  const handleStatusCancel = async () => {
    try {
      await axiosSecure.patch("/update-blood-status-done", {
        id: request._id,
        status: "cancel",
      });
      toast.success("Status Update Successfully");
      await statusRefetch();
    } catch (err) {
      toast("Something went Wrong ... Try Again ..");
      console.log(err);
    }
  };
  const handleDelete = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });

  if (result.isConfirmed) {
    try {
      await axiosSecure.post("/delete-request", {
        id: request._id,
        request,
      });
      toast.success("Request deleted"); // Assuming toast.success for success (common pattern; adjust if it's toast.delete)
      await statusRefetch()
      Swal.fire({
        title: "Deleted!",
        text: "Your request has been deleted.",
        icon: "success"
      });
    } catch (err) {
      console.log(err);
      toast.error("Error happened"); // Assuming toast.error for errors
    }
  }
};
  return (
    <tr>
      <td>{request.recipientName}</td>

      <td className="hidden md:table-cell">
        {upazilaName} , {districtName}
      </td>

      <td>{request.donationDate}</td>

      <td className="hidden md:table-cell">{request.donationTime}</td>

      <td>{request.bloodGroup}</td>

      {request.status === "pending" && (
        <td className="px-4 py-3">
          <span
            onClick={() => setIsOpen(true)}
            className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-blue-900 leading-tight"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">{request.status}</span>
          </span>
          {/* Modal */}
          <UpdateStatusModal
            statusRefetch={statusRefetch}
            request={request}
            isOpen={isOpen}
            closeModal={closeModal}
            role="pending"
          />
        </td>
      )}
      {request.status === "inprogress" && (
        <td className="px-4 py-3">
          <span
            onClick={() => setIsOpen(true)}
            className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-blue-900 leading-tight"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-yellow-400 opacity-50 rounded-full"
            ></span>
            <span className="relative">{request.status}</span>
          </span>
        </td>
      )}
      {request.status === "done" && (
        <td className="px-4 py-3">
          <span
            onClick={() => setIsOpen(true)}
            className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-blue-900 leading-tight"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-green-600 opacity-50 rounded-full"
            ></span>
            <span className="relative">{request.status}</span>
          </span>
        </td>
      )}
      {request.status === "cancel" && (
        <td className="px-4 py-3">
          <span
            onClick={() => setIsOpen(true)}
            className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-blue-900 leading-tight"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-red-600 opacity-50 rounded-full"
            ></span>
            <span className="relative">{request.status}</span>
          </span>
        </td>
      )}

      {/* Donor info */}
      <td className="hidden lg:table-cell">
        {request.status === "pending" ? (
          "-"
        ) : (
          <>
            <p className="capitalize">{request.donorName}</p>
            <p className="text-xs text-gray-500">{request.donorEmail}</p>
          </>
        )}
      </td>

      {/* Actions */}
      <td>
        <div className="flex flex-col md:flex-row gap-1 md:gap-2">
          {request.status === "inprogress" &&
            (user?.email === request.registererEmail ||
              role === "admin" ||
              role === "volunteer") && (
              <>
                <button
                  onClick={handleStatusDone}
                  className="btn btn-xs btn-success"
                >
                  Done
                </button>
                <button
                  onClick={handleStatusCancel}
                  className="btn btn-xs btn-warning"
                >
                  Cancel
                </button>
              </>
            )}

          {request.status === "pending" &&
          user?.email === request.registererEmail ? (
            <Link
              to={`/dashboard/edit-request/${request._id}`}
              className="btn btn-xs btn-info"
            >
              Edit
            </Link>
          ) : (
            <span className="btn btn-xs btn-disabled  ">Edit</span>
          )}

          {user?.email === request.registererEmail && role === "volunteer" && (
            <button onClick={handleDelete} className="btn btn-xs btn-error">
              Delete
            </button>
          )}
          {user?.email === request.registererEmail && role === "donor" && (
            <button onClick={handleDelete} className="btn btn-xs btn-error">
              Delete
            </button>
          )}
          {role === "admin" && (
            <button onClick={handleDelete} className="btn  btn-xs btn-error">
              Delete
            </button>
          )}

          <Link
            to={`/request/${request._id}`}
            className="btn btn-xs btn-outline"
          >
            View
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default MyDonationRequestRow;
