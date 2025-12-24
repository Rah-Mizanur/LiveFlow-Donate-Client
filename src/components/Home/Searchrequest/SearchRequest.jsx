import React, { useState } from "react";
import useDistrictUpazila from "../../../hooks/useDistrictUpazila";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DonorCart from "./DonorCart/DonorCart";

const SearchRequest = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  
  const selectedDistrict = watch("zila");
  const selectedUpazila = watch("upazila");

  // State  sent to the API
  const [searchParams, setSearchParams] = useState({
    bloodGroup: "",
    zila: "",
    upazila: "",
  });
  console.log("searchParams", searchParams);
  const { zilas, filteredUpazilas } = useDistrictUpazila(
    selectedDistrict,
    selectedUpazila
  );
  const {
    data: searchData = [],
    isLoading: isSearchLoading,
    refetch,
  } = useQuery({
    queryKey: ["searchData", searchParams],
    queryFn: async () => {
      const { bloodGroup, zila, upazila } = searchParams;

      // Use URLSearchParams
      const params = new URLSearchParams();
      if (bloodGroup) params.append("bloodGroup", bloodGroup);
      if (zila) params.append("district", zila);
      if (upazila) params.append("upazila", upazila);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/searchdata?${params.toString()}`
      );
      return res.data;
    },
    enabled: !!searchParams, 
  });
 
  const onSubmit = (data) => {
    setSearchParams({
      bloodGroup: data.bloodGroup,
      zila: data.zila,
      upazila: data.upazila,
    });
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <form className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">
          Search Donors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Blood Group */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Blood Group:
            </label>
            <select
              {...register("bloodGroup")}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              District
            </label>
            <select
              {...register("zila")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="">Select District</option>
              {zilas.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Upazila
            </label>
            <select
              {...register("upazila")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              disabled={!selectedDistrict}
            >
              <option value="">
                {selectedDistrict ? "Select Upazila" : "Select District first"}
              </option>
              {filteredUpazilas.map((up) => (
                <option key={up.id} value={up.id}>
                  {up.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-[#2B4C7E] hover:bg-[#1f385c] text-white font-bold py-2 px-12 rounded-md transition duration-200"
          >
            {isSearchLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {searchData.length > 0 ? (
            // searchData.map((item) => (
            //   <div
            //     key={item._id}
            //     className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex gap-4"
            //   >
            //     {/* Your Card Content here */}
            //     <div className="flex-grow">
            //       <h3 className="font-bold">{item.recipientName}</h3>
            //       <p className="text-red-600 font-bold">{item.bloodGroup}</p>
            //       <p className="text-sm text-gray-500">{item.location}</p>
            //       <button className="mt-2 text-blue-600 text-sm">
            //         View Details
            //       </button>
            //     </div>
            //   </div>
            // ))
            searchData.map(donor=> <DonorCart key={donor._id} donor={donor}></DonorCart>)
          ) : (
            <p className="text-center col-span-2 text-gray-400">
              No requests found. Try a different search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchRequest;
