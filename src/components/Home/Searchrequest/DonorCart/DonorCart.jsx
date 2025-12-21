import React from 'react';
import useDistrictUpazila from '../../../../hooks/useDistrictUpazila';

const DonorCart = ({ donor }) => {
  // Destructuring props for cleaner code
  const { 
    name, 
    bloodGroup, 
    zila, 
    upazila, 
    image, 
    status 
  } = donor;

  const {districtName ,upazilaName}= useDistrictUpazila(zila,upazila)

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col sm:flex-row p-4 gap-4 max-w-lg">
      
      {/* Left Side: Profile Image */}
      <div className="w-full sm:w-36 h-36 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={image || "https://via.placeholder.com/150"} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side: Details */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-slate-800">{name}</h3>
            {/* Blood Drop Icon and Group */}
            <div className="flex items-center gap-1">
               <span className="text-red-600 font-bold text-lg">{bloodGroup}</span>
               <svg className="w-5 h-5 text-red-600 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
               </svg>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 font-medium">
            {upazilaName}, {districtName}
          </p>
          
          <div className="mt-2">
            <p className="text-sm font-semibold text-gray-700">
              Blood Group: <span className="text-red-600">{bloodGroup}</span>
            </p>
          </div>

          {/* Availability Status */}
          <div className="mt-2 flex items-center text-green-600 text-sm font-bold">
            <span className="mr-1 text-lg">🔄</span>
            {status === 'block' ? 'Not Available' : 'Available Now'}
          </div>
        </div>

        {/* View Profile Button */}
        <div className="mt-4">
          <button className="w-full bg-[#2B4C7E] hover:bg-[#1f385c] text-white text-sm font-bold py-2 px-6 rounded-md transition duration-200">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonorCart;