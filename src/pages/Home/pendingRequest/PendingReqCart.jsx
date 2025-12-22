import React from 'react';
import useDistrictUpazila from '../../../hooks/useDistrictUpazila';
import { useNavigate } from 'react-router';

const PendingReqCart = ({ request }) => {
  const navigate = useNavigate();
  const { districtName, upazilaName } = useDistrictUpazila(
    request.recipientZila,
    request.recipientUpazila
  );



  const formatTime = (time) => {
    if (!time) return "N/A";
    const [hour, minute] = time.split(":");
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  const donationTime = formatTime(request.donationTime);

  const handleDetails = () => {
    navigate(`/request/${request._id}`);
  };

  return (
   <div className="rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 bg-white overflow-hidden border border-brand-blue">
      
      {/* Card Header: Blood Group & Urgency */}
      <div className="p-4 flex justify-between items-center bg-brand-red">
        <div className="flex items-center gap-2">
          <div className="bg-white text-xl font-black px-3 py-1 rounded-lg shadow-sm text-brand-red">
            {request.bloodGroup}
          </div>
        </div>
        <span className="animate-pulse text-[10px] font-bold px-2 py-1 rounded-full bg-white/20 text-white uppercase tracking-tighter border border-white/30">
          Urgent Request
        </span>
      </div>

      {/* Card Body */}
      <div className="p-5">
        <h3 className="font-bold text-slate-800 text-xl mb-3 truncate">
          {request.recipientName}
        </h3>
        
        <div className="space-y-3">
          {/* Location with soft blue background */}
          <div className="flex items-center gap-2 p-2 rounded-lg text-slate-700 bg-brand-blue-light">
            <svg className="w-4 h-4 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-medium truncate">{upazilaName}, {districtName}</span>
          </div>

          {/* Date & Time */}
          <div className="flex flex-col gap-1 px-1">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Required On</p>
            <p className="text-sm font-bold text-slate-700">
               {request.donationDate} <span className="mx-1 text-gray-300">|</span> {donationTime}
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer: Action Button */}
      <div className="p-5 pt-0">
        <button 
          onClick={handleDetails} 
          className="w-full bg-brand-red text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 hover:opacity-90"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PendingReqCart;