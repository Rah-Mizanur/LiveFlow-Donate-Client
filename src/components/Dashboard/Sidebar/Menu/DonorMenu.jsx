import React from 'react'
import MenuItem from './MenuItem'
import { MdDashboard } from "react-icons/md";
import { BiDonateBlood } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
const DonorMenu = () => {
  return (
    <div>
      <MenuItem icon={MdDashboard}label='Dashboard' address=''></MenuItem>
      <MenuItem icon={BiDonateBlood}label='My Donation requests' address='my-donation-requests'></MenuItem>
      <MenuItem icon={AiOutlinePlusCircle}label='Create Donation request' address='create-donation-request'></MenuItem>
    </div>
  )
}

export default DonorMenu
