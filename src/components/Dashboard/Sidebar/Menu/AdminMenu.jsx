import MenuItem from "./MenuItem"

import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { FaHandHoldingMedical } from "react-icons/fa";
const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={MdDashboard}label='Dashboard' address=''></MenuItem>
      <MenuItem icon={HiUsers}label='All Users' address='all-users'></MenuItem>
      <MenuItem icon={FaHandHoldingMedical}label='All Blood Donation Requests' address='all-blood-donation-request'></MenuItem>
       </>
  )
}

export default AdminMenu
