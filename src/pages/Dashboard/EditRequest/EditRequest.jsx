import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useDistrictUpazila from "../../../hooks/useDistrictUpazila";

const EditRequest = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const axiosSecure = useAxiosSecure();
  const [zilas, setZilas] = useState([]); // Zilas (District) data
  const [upazilas, setUpazilas] = useState([]); // All Upazilas data
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  //   location data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const zilaResponse = await fetch("/zilaData.json");
        const zilaData = await zilaResponse.json();

        const upzilaResponse = await fetch("/upzilaData.json");
        const upzilaData = await upzilaResponse.json();
        setUpazilas(upzilaData);
        setZilas(zilaData);
        if (zilaData.length > 0) {
          // selectedDistrict has need a value immediately
          setValue("recipientZila", zilaData[0].id);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
 

 const selectedDistrict = watch("recipientZila");
  const filteredUpazilas = upazilas.filter(
    (upazila) => upazila.district_id === selectedDistrict
  );

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const { data: reqDetails = [], isLoading } = useQuery({
    queryKey: ["reqDetails", id, user?.email],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/req-details/${id}`
      );
      return result.data;
    },
  });
 const { districtName, upazilaName } = useDistrictUpazila(
        reqDetails.recipientZila, 
        reqDetails.recipientUpazila
    );

console.log(districtName)
  const onSubmit = () => {
    console.log("okay");
  };
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">
        Create Donation Request 🩸
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Requester Name */}
        <div>
          <label className="label">Requester Name</label>
          <input
            type="text"
            {...register("registererName")}
           defaultValue={reqDetails.registererName}
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Requester Email */}
        <div>
          <label className="label">Requester Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Recipient Name */}
        <div>
          <label className="label">Recipient Name</label>
          <input
            type="text"
            {...register("recipientName")}
            defaultValue={reqDetails.recipientName}
            name="recipientName"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* District & Upazila */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm">District</label>
            <select
              {...register("recipientZila", {
                required: "District is required",
              })}
              defaultValue={districtName}
              className="w-full px-3 py-2 border-[#2C9AD5] rounded-md bg-gray-100"
            >
              <option value="" disabled>
                Select District
              </option>
              {zilas.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            {errors.recipientZila && (
              <p className="text-red-500 text-xs mt-1">
                {errors.recipientZila.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm">Upazila</label>
            <select
              {...register("recipientUpazila", {
                required: "Upazila is required",
              })}
              defaultValue={reqDetails.recipientUpazila}
              disabled={!selectedDistrict}
              className="w-full px-3 py-2 border-[#2C9AD5] rounded-md bg-gray-100"

              // Disable if no district is selected or no upazilas are available
            >
              <option value="" disabled>
                {selectedDistrict ? "Select Upazila" : "Select District first"}
              </option>
              {filteredUpazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.id}>
                  {upazila.name}
                </option>
              ))}
            </select>
            {errors.recipientUpazila && (
              <p className="text-red-500 text-xs mt-1">
                {errors.recipientUpazila.message}
              </p>
            )}
          </div>
        </div>

        {/* Hospital Name */}
        <div>
          <label className="label">Hospital Name</label>
          <input
            type="text"
            name="hospitalName"
            {...register("hospitalName")}
            defaultValue={reqDetails.hospitalName}
            required
            placeholder="Dhaka Medical College Hospital"
            className="input input-bordered w-full"
          />
        </div>

        {/* Full Address */}
        <div>
          <label className="label">Full Address</label>
          <input
            type="text"
            name="fullAddress"
            {...register("recipientAddress")}
            defaultValue={reqDetails.recipientAddress}
            required
            placeholder="Zahir Raihan Rd, Dhaka"
            className="input input-bordered w-full"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block mb-1 text-sm">Blood Group</label>
          <select
            {...register("bloodGroup", {
              required: "Blood Group is required",
            })}
            defaultValue={reqDetails.bloodGroup}
            className="w-full px-3 py-2 border-[#2C9AD5] rounded-md bg-gray-100"
          >
            <option value="" disabled>
              Select Blood Group
            </option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
          {errors.bloodGroup && (
            <p className="text-red-500 text-xs mt-1">
              {errors.bloodGroup.message}
            </p>
          )}
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Donation Date</label>
            <input
              type="date"
              {...register("donationDate")}
              name="donationDate"
              defaultValue={reqDetails.donationDate}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Donation Time</label>
            <input
              type="time"
              {...register("donationTime")}
              name="donationTime"
                  defaultValue={reqDetails.donationTime}
              required
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Request Message */}
        <div>
          <label className="label">Request Message</label>
          <textarea
            name="requestMessage"
            {...register("requestMessage")}
                defaultValue={reqDetails.requestMessage}
            rows="4"
            required
            placeholder="Explain why blood is needed..."
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditRequest;
