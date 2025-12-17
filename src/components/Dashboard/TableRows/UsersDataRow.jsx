import React from 'react'

const UsersDataRow = ({webUser}) => {
const {name ,email,role,status,image}= webUser
  return (
    
      <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">
                <img
                  src={image}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
              </td>

              <td className="px-4 py-3 font-medium">{name}</td>

              <td className="px-4 py-3 text-gray-600">
             {email}
              </td>

              <td className="px-4 py-3">
                <span className="px-3 capitalize py-1 rounded-full bg-purple-100 text-purple-700 text-xs">
                  {role}
                </span>
              </td>

              <td className="px-4 py-3">
                <span className="px-3 capitalize py-1 rounded-full bg-green-100 text-green-700 text-xs">
                  {status}
                </span>
              </td>

              <td className="px-4 py-3 text-center">
                <button className="px-3 py-1 rounded-md bg-red-500 text-white text-xs">
                  Block
                </button>
              </td>
            </tr>
    
  )
}

export default UsersDataRow
