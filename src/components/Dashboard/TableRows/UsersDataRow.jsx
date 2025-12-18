import React, { useState } from "react";
import UpdateUserRoleModal from "../Modal/UpdateUserModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UsersDataRow = ({ webUser,refetch }) => {
  const axiosSecure = useAxiosSecure()
  console.log(webUser)
  const { name, email, role, status, image } = webUser;
   let [isOpen, setIsOpen] = useState(false)
   const closeModal = () => setIsOpen(false)

  const handleStatus = async()=>{
      try{
      await axiosSecure.patch('/update-status',{
        email : webUser?.email 
      })
      toast.success(`${webUser.name} Status Changed`)
      refetch()
 
    }catch(err){
      toast('Something went Wrong ... Try Again ..')
      console.log(err)
    }finally{
      console.log('status Updated')
  }
  }


  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">
        <img src={image} alt="avatar" className="w-10 h-10 rounded-full" />
      </td>

      <td className="px-4 py-3 font-medium">{name}</td>

      <td className="px-4 py-3 text-gray-600">{email}</td>

      <td className="px-4 py-3">
      <span className="px-3 capitalize py-1 rounded-full bg-purple-100 text-purple-700 text-xs">
                  {role}
                </span>
     
      </td>
       <td className="px-4 py-3">
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-blue-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </span>
        {/* Modal */}
        <UpdateUserRoleModal
          refetch={refetch}
          webUser={webUser}
          isOpen={isOpen}
          closeModal={closeModal}
          role="donor"
        />
      </td>

      <td className="px-4 py-3">
        <span className="px-3 capitalize py-1 rounded-full bg-green-100 text-green-700 text-xs">
          {status}
        </span>
      </td>

      <td className="px-4 py-3 text-center">
        {
          status === 'active' && <button onClick={handleStatus} className="px-3 py-1 rounded-md bg-red-500 text-white text-xs">
       Block
        </button>
        }
        {
          status === 'block' && <button onClick={handleStatus} className="px-3 py-1 rounded-md bg-blue-500 text-white text-xs">
      Unblock
        </button>
        }
      </td>
    </tr>
  );
};

export default UsersDataRow;
