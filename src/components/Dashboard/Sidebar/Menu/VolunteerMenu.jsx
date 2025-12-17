import MenuItem from "./MenuItem"

import { MdDashboard } from "react-icons/md";

import { FaHandHoldingMedical } from "react-icons/fa";
import { BiDonateBlood } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
const VolunteerMenu = () => {
  return (
    <>
      <MenuItem icon={MdDashboard}label='Dashboard' address=''></MenuItem>
        <MenuItem icon={BiDonateBlood}label='My Donation requests' address='my-donation-requests'></MenuItem>
      <MenuItem icon={AiOutlinePlusCircle}label='Create Donation request' address='create-donation-request'></MenuItem>
      <MenuItem icon={FaHandHoldingMedical}label='All Blood Donation Requests' address='all-blood-donation-request'></MenuItem>
       </>
  )
}

export default VolunteerMenu
