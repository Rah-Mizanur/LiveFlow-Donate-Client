import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router";
import { imageUpload, saveOrUpdateUser } from "../../utils";
import useDistrictUpazila from "../../hooks/useDistrictUpazila";

const SignUp = () => {
  const { createUser, updateUserProfile, loading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  // Destructure useForm, including formState.errors for validation messages
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

    const selectedDistrict = watch("zila");
  const selectedUpazila = watch("upazila");

  const {
    zilas,
    filteredUpazilas,
    isLoading,
  } = useDistrictUpazila(selectedDistrict, selectedUpazila);

  const onSubmit = async (data) => {
    const { name, email, password, bloodGroup, zila, upazila, image } = data;

    // Safety check for password match before calling auth (though react-hook-form handles it)
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    const imageFile = image[0];

    try {
      // Upload the image and get the image URL
      const imageUrl = await imageUpload(imageFile);

      // Create the user with email and password
      const result = await createUser(email, password);

      // Update user profile with name and image
      await updateUserProfile(name, imageUrl);

      // Placeholder: Save user data (you should add actual logic to save data)
      const userData = {
        name,
        email,
        bloodGroup,
        zila,
        upazila,
        uid: result.user.uid,
        image: imageUrl,
      };

      await saveOrUpdateUser(userData);

      toast.success("Signup Successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "An error occurred.");
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl text-[#2C9AD5] font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400 ">Welcome to LiveFlow</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#2C9AD5] bg-gray-200 text-gray-900"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#2C9AD5] bg-gray-200 text-gray-900"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Profile Image
              </label>
              <input
                name="image"
                {...register("image")}
                type="file"
                id="image"
                accept="image/*"
                className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-lime-50 file:text-[#2C9AD5]
      hover:file:bg-lime-100
      bg-gray-100 border border-dashed border-[#2C9AD5] rounded-md cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-[#2C9AD5] focus:[#2C9AD5]
      py-2"
              />
              <p className="mt-1 text-xs text-gray-400">
                PNG, JPG or JPEG (max 2MB)
              </p>
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

            {/* District/Zila */}
            <div>
              <label className="block mb-1 text-sm">District</label>
              <select
                {...register("zila", { required: "District is required" })}
                defaultValue=""
                className="w-full px-3 py-2 border-[#2C9AD5] rounded-md bg-gray-100"
              >
                <option value="">
                  Select District
                </option>
                {zilas.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
              {errors.zila && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.zila.message}
                </p>
              )}
            </div>

            {/* Upazila */}
            <div>
              <label className="block mb-1 text-sm">Upazila</label>
              <select
                {...register("upazila", { required: "Upazila is required" })}
                defaultValue=""
                className="w-full px-3 py-2 border-[#2C9AD5] rounded-md bg-gray-100"
                // Disable if no district is selected or no upazilas are available
                disabled={!selectedDistrict || filteredUpazilas.length === 0}
              >
                <option value="" disabled>
                  {selectedDistrict
                    ? "Select Upazila"
                    : "Select District first"}
                </option>
                {filteredUpazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.id}>
                    {upazila.name}
                  </option>
                ))}
              </select>
              {errors.upazila && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.upazila.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-sm mb-2">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#2C9AD5] bg-gray-200 text-gray-900"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password (With Validation) */}
            <div>
              <label htmlFor="confirmPassword" className="text-sm mb-2">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  // CRITICAL VALIDATION: Check if it matches the 'password' field
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type="password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#2C9AD5] bg-gray-200 text-gray-900"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading} // Disable button during loading
              className="bg-[#2C9AD5] w-full rounded-md py-3 text-white transition-opacity duration-200 disabled:opacity-70 hover:bg-[#1A83B4]"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>

        <p className="px-6 text-sm text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-[#2C9AD5] text-gray-600 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
