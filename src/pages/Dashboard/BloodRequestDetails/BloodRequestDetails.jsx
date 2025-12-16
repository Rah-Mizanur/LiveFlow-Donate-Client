import React from 'react'
import useAuth from '../../../hooks/useAuth';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useDistrictUpazila from '../../../hooks/useDistrictUpazila';
import DetailItem from '../../../components/Shared/DetailItem/DetailItem';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const BloodRequestDetails = () => {
     const { user } = useAuth();
  const { id } = useParams();

  const axiosSecure = useAxiosSecure();
  const { data: reqDetails = [], isLoading } = useQuery({
    queryKey: ["reqDetails", id, user?.email],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/req-details/${id}`
      );
      return result.data;
    },
  });
  console.log(reqDetails)
const { districtName, upazilaName } = useDistrictUpazila(
        reqDetails.recipientZila, 
        reqDetails.recipientUpazila
    );

const formatTime = (time) => {
        // Assuming donationTime is 'HH:mm'
        if (!time) return 'N/A';
        const [hour, minute] = time.split(':');
        // Simple 24h to 12h conversion (for demonstration)
        const h = parseInt(hour, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const formattedHour = h % 12 || 12; // Converts 0 to 12
        return `${formattedHour}:${minute} ${ampm}`;
    };

   

    if(isLoading) return <LoadingSpinner></LoadingSpinner>

  return (

    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            
            <header className="border-b pb-4 mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-red-600 flex items-center">
                    <span role="img" aria-label="blood drop" className="mr-2">🩸</span>
                    Donation Request Details
                </h1>
                <span 
                    className={`px-3 py-1 text-sm font-semibold rounded-full uppercase ${
                        reqDetails.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}
                >
                    {reqDetails.status}
                </span>
            </header>

            {/* --- RECIPIENT & LOCATION SECTION --- */}
            <section className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Recipient Information</h2>
                    <DetailItem label="Recipient Name" value={reqDetails.recipientName} />
                    <DetailItem label="Blood Group" value={reqDetails.bloodGroup} className="text-xl font-bold text-red-600" />
                    <DetailItem label="Hospital Name" value={reqDetails.hospitalName} />
                    <DetailItem label="Hospital Address" value={reqDetails.recipientAddress} />
                </div>
                
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Location & Time</h2>
  
                    <DetailItem 
                        label="Location :" 
                        value={`${upazilaName}, ${districtName}`} 
                      
                    />
                    <DetailItem label="Donation Date" value={reqDetails.donationDate} />
                    <DetailItem label="Donation Time" value={formatTime(reqDetails.donationTime)} />
                </div>
            </section>

            {/* --- MESSAGE & REGISTERER SECTION --- */}
            <section className="mt-8 pt-6 border-t">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Request Message</h2>
                <blockquote className="p-4 bg-gray-50 border-l-4 border-red-400 italic text-gray-600 rounded-md">
                    "{reqDetails.requestMessage}"
                </blockquote>
            </section>

            <section className="mt-8 pt-6 border-t">
                 <h2 className="text-xl font-semibold text-gray-700 mb-4">Posted By</h2>
                 <DetailItem label="Registerer Name" value={reqDetails.registererName} />
                 <DetailItem label="Registerer Email" value={reqDetails.registererEmail} />
                 <DetailItem label="Request Submitted" value={new Date(reqDetails.requestTime).toLocaleString()} />
            </section>
            
            <footer className="mt-10 pt-6 border-t text-center">
                <p className="text-sm text-gray-500">Request ID: {reqDetails._id}</p>
                {/* Action Button: e.g., <button>Accept Donation</button> */}
            </footer>
        </div>
    );
};



export default BloodRequestDetails
