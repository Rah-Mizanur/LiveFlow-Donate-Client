import React from 'react'
import bannerImg from '../../assets/images/banner.jpg'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router'
const BannerComonent = () => {
    const {user} = useAuth() 
    const navigate = useNavigate()
    const handleDonor =()=>{
        if(user){
            navigate('/dashboard/profile')
        }
        else{
            navigate('/login')
        }
    }
    const handleSearch = ()=>{
        navigate('/search-request')
    }
  return (
     <div className="relative w-full">
    {/* Banner Image */}
    <img
      src={bannerImg}
      alt="banner"
      className="w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px] object-cover"
    />

    {/* Buttons */}
    <div
      className="
        absolute
        top-[80%]
        left-1/2
        -translate-x-1/2
        md:left-[30%]
        md:-translate-x-0
        flex flex-row
        gap-3
        whitespace-nowrap
      "
    >
      <button
      onClick={handleDonor}
        className="
          px-4 py-2
          sm:px-5 sm:py-2.5
          md:px-6 md:py-3
          bg-red-600
          text-white
          rounded-xl
          shadow
          hover:bg-red-700
          transition
        "
      >
        Join as Donor
      </button>

      <button
      onClick={handleSearch}
        className="
          px-4 py-2
          sm:px-5 sm:py-2.5
          md:px-6 md:py-3
          bg-white
          text-red-600
          rounded-xl
          shadow
          hover:bg-gray-200
          transition
        "
      >
        Search Donors
      </button>
    </div>
  </div>
  )
}

export default BannerComonent
