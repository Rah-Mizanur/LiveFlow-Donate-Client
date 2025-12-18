import React from 'react'
import useAuth from '../../../hooks/useAuth'
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const DetailsFormModal = ({isOpen,setIsOpen,requireId}) => {
    const {user} = useAuth()
   const axiosSecure = useAxiosSecure()
      const handleDonate = async () => {
   
    try {
      await axiosSecure.patch("/update-blood-status", {
        id: requireId,
        status: "inprogress",
        donorName: user.displayName,
        donorEmail: user.email,
      });
      toast.success("Status Update Successfully");
    } catch (err) {
      toast("Something went Wrong ... Try Again ..");
      console.log(err);
    }
  };
  return (
    <div>
      {isOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white w-full max-w-md rounded-lg p-6 relative">
      
      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-2 right-3 text-xl"
      >
        ✕
      </button>

      <h2 className="text-lg font-semibold mb-4">
        Confirm Blood Donation
      </h2>

      <form onSubmit={handleDonate} className="space-y-4">
        
        {/* Donor Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Donor Name
          </label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Donor Email */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Donor Email
          </label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Confirm Button */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Confirm Donation
        </button>
      </form>
    </div>
  </div>
)}

    </div>
  )
}

export default DetailsFormModal
