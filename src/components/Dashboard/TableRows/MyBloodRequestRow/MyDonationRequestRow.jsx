import { Link } from "react-router";
import useDistrictUpazila from "../../../../hooks/useDistrictUpazila";
import { useState } from "react";
import UpdateStatusModal from "../../Modal/UpdateStatusModal";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyDonationRequestRow = ({ request, statusRefetch }) => {
  const { districtName, upazilaName } = useDistrictUpazila(
    request.recipientZila,
    request.recipientUpazila
  );
  const axiosSecure = useAxiosSecure()
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const handleStatusDone = async()=>{
       try {
      await axiosSecure.patch("/update-blood-status-done", {
        id: request._id,
        status: "done",  
      });
      toast.success("Status Update Successfully");
       await statusRefetch()
    } catch (err) {
      toast("Something went Wrong ... Try Again ..");
      console.log(err);
    }
  }

  const handleStatusCancel =async()=>{
          try {
      await axiosSecure.patch("/update-blood-status-done", {
        id: request._id,
        status: "cancel",  
      });
      toast.success("Status Update Successfully");
      await  statusRefetch()
    } catch (err) {
      toast("Something went Wrong ... Try Again ..");
      console.log(err);
    }
  }
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
          {request.status === "inprogress" && (
            <>
              <button onClick={handleStatusDone} className="btn btn-xs btn-success">Done</button>
              <button onClick={handleStatusCancel} className="btn btn-xs btn-warning">Cancel</button>
            </>
          )}

          <Link
            to={`/dashboard/edit-request/${request._id}`}
            className="btn btn-xs btn-info"
          >
            Edit
          </Link>

          <button className="btn btn-xs btn-error">Delete</button>

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
