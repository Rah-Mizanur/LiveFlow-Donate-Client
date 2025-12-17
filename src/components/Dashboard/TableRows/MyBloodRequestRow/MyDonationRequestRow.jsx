
import { Link } from 'react-router'
import useDistrictUpazila from '../../../../hooks/useDistrictUpazila';

const MyDonationRequestRow = ({request}) => {
 const { districtName, upazilaName } = useDistrictUpazila(
        request.recipientZila, 
        request.recipientUpazila
    );
  return (
    <tr>
      <td>{request.recipientName}</td>

                    <td className="hidden md:table-cell">
                    {upazilaName} , {districtName} 
                    </td>

                    <td>{request.donationDate}</td>

                    <td className="hidden md:table-cell">
                      {request.donationTime}
                    </td>

                    <td>{request.bloodGroup}</td>

                    <td className="capitalize font-bold text-red-300 rounded-2xl ">{request.status}</td>

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
                        {/* {request.status === "inprogress" && (
                          <>
                            <button className="btn btn-xs btn-success">
                              Done
                            </button>
                            <button className="btn btn-xs btn-warning">
                              Cancel
                            </button>
                          </>
                        )} */}

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
                          to={`/request/${request._id}`}
                          className="btn btn-xs btn-outline"
                        >
                          View
                        </Link>
                      </div>
                    </td>
    </tr>
  )
}

export default MyDonationRequestRow
