import MenuItem from "./MenuItem"

import { MdDashboard } from "react-icons/md";

import { FaHandHoldingMedical } from "react-icons/fa";
const VolunteerMenu = () => {
  return (
    <>
      <MenuItem icon={MdDashboard}label='Dashboard' address=''></MenuItem>
   
      <MenuItem icon={FaHandHoldingMedical}label='All Blood Requests' address='all-blood-donation-request'></MenuItem>
       </>
  )
}

export default VolunteerMenu
