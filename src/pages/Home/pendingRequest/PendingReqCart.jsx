import React from 'react'
import useDistrictUpazila from '../../../hooks/useDistrictUpazila';
import { useNavigate } from 'react-router';

const PendingReqCart = ({request}) => {
    const navigate = useNavigate()
     const { districtName, upazilaName } = useDistrictUpazila(
    request.recipientZila,
    request.recipientUpazila
  );

      const formatTime = (time) => {
    // Assuming donationTime is 'HH:mm'
    if (!time) return "N/A";
    const [hour, minute] = time.split(":");
    // Simple 24h to 12h conversion (for demonstration)
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12; // Converts 0 to 12
    return `${formattedHour}:${minute} ${ampm}`;
  };

  const donationTime = formatTime(request.donationTime)

  const handleDetails = ()=>{
    navigate(`/request/${request._id}`)
  }
  return (
    <div  className="border border-red-100 rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white overflow-hidden">
            
            {/* Card Header: Blood Group & Urgency */}
            <div className="bg-[#e26048] p-4 flex justify-between items-center border-b border-red-100">
              <span className="font-bold text-red-600 bg-white px-3 py-1 rounded-full shadow-sm">
                {request.bloodGroup}
              </span>
              <span className='text-xs font-semibold px-2 py-1 rounded uppercase tracking-wide 
                bg-yellow-100 text-yellow-800'
              >
                Need Urgency
              </span>
            </div>

            {/* Card Body */}
            <div className="p-4">
              <h3 className="font-bold text-gray-800 text-lg">{request.recipientName}</h3>
              <div className="flex items-center text-gray-500 text-sm mt-2">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                {upazilaName} ,{districtName}
              </div>
              <p className="text-sm font-semibold text-red-400 mt-2">Needed:{donationTime} ,{request.donationDate}</p>
            </div>

            {/* Card Footer: Action Button */}
            <div className="p-4 pt-0">
              <button onClick={handleDetails} className="capitalize w-full bg-blue-500 hover:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                view details
              </button>
            </div>

          </div>
  )
}

export default PendingReqCart
