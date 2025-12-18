import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../../ErrorPage";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUserStatus from "../../../../hooks/useUserStatus";

const CreateDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure  = useAxiosSecure();
  const [zilas, setZilas] = useState([]); // Zilas (District) data
  const [upazilas, setUpazilas] = useState([]); // All Upazilas data
  const {status,isStatusLoading} = useUserStatus()
  console.log(status)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

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

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.post(`${import.meta.env.VITE_API_URL}/create-request`, payload),
    onMutate: (payload) => {
      console.log("i will post this data to DB", payload);
    },
    onSettled: (data, error) => {
      if (data) {
        console.log(data);
        mutationReset();
        toast.success("Request create successfully");
      }
      if (error) console.log(error);
    },
    retry: 3,
  });

  const onSubmit = async (data) => {
    const {
      registererName,
      recipientName,
      recipientZila,
      recipientUpazila,
      recipientAddress,
      hospitalName,
      bloodGroup,
      requestMessage,
      donationDate,
      donationTime,
    } = data;

    try {
      const bloodRequestData = {
        registererName,
        registererEmail: user?.email,
        recipientName,
        recipientZila,
        recipientUpazila,
        recipientAddress,
        hospitalName,
        bloodGroup,
        requestMessage,
        donationDate,
        donationTime,
      };
      await mutateAsync(bloodRequestData)
      reset()
        } catch (err) {
      console.log(err);
    }
  };

  if (isPending) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <ErrorPage></ErrorPage>;
  return (
 <>
 {
  status === 'block' ? ( 
  <div  className="p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl bg-blue-200 p-3 text-red-600 font-semibold mb-6">
      Your Status is block so you cannot Create Donation Requests 🥲
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Requester Name */}
        <div>
          <label className="label">Requester Name</label>
          <input
            type="text"
            {...register("registererName")}
            value={user?.name}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Requester Email */}
        <div>
          <label className="label">Requester Email</label>
          <input
            type="email"
            value={user?.email}
            disabled
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
            name="recipientName"
            required
               disabled
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
              defaultValue=""
                 disabled
              className="w-full px-3 py-2 border-[#2C9AD5] rounded-md bg-gray-100"
            >
              <option value="" disabled>
                Select District
              </option>
              {zilas.map((district) => (
                <option key={district.id}    disabled value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            {errors.recipientZila && (
              <p className="text-red-500 text-xs mt-1">{errors.recipientZila.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm">Upazila</label>
            <select
              {...register("recipientUpazila", {
                required: "Upazila is required",
              })}
              defaultValue=""
              disabled={!selectedDistrict}
                 
              className="w-full px-3 py-2 border-[#2C9AD5] rounded-md bg-gray-100"

              // Disable if no district is selected or no upazilas are available
            >
              <option value="" disabled>
                {selectedDistrict ? "Select Upazila" : "Select District first"}
              </option>
              {filteredUpazilas.map((upazila) => (
                <option key={upazila.id} disabled value={upazila.id}>
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
            required
            disabled
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
            disabled
            {...register("recipientAddress")}
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
            defaultValue=""
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
              required
              disabled
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Donation Time</label>
            <input
              type="time"
              {...register("donationTime")}
              name="donationTime"
              required
              disabled
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
            rows="4"
            required
            disabled
            placeholder="Explain why blood is needed..."
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Request Blood
        </button>
      </form>
    </div>): ( <div  className="p-4 md:p-6 max-w-3xl mx-auto">
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
            value={user?.name}
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
              defaultValue=""
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
              <p className="text-red-500 text-xs mt-1">{errors.recipientZila.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm">Upazila</label>
            <select
              {...register("recipientUpazila", {
                required: "Upazila is required",
              })}
              defaultValue=""
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
            defaultValue=""
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
            rows="4"
            required
            placeholder="Explain why blood is needed..."
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Request Blood
        </button>
      </form>
    </div>)
 }
 </>
  );
};

export default CreateDonationRequests;
