import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";

import Card from "../../../components/Shared/Card/Card";
import CardContent from "../../../components/Shared/CardContent/CardContent";
import Label from "../../../components/Shared/Label/Label";
import Button from "../../../components/Shared/Button/Button";
import Input from "../../../components/Shared/Input/Input";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDistrictUpazila from "../../../hooks/useDistrictUpazila";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  /* ---------------- Fetch Profile ---------------- */
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure("/profile");
      return res.data;
    },
  });

  /* ---------------- Set Form Values ---------------- */
  useEffect(() => {
    if (profile) {
      setValue("name", profile.name);
      setValue("email", profile.email);
      setValue("zila", profile.zila);       // district ID
      setValue("upazila", profile.upazila); // upazila ID
      setValue("bloodGroup", profile.bloodGroup);
      setProfileImage(profile.image);
    }
  }, [profile, setValue]);

  /* ---------------- District & Upazila Hook ---------------- */
  const selectedDistrict = watch("zila");
  const selectedUpazila = watch("upazila");

  const {
    zilas,
    filteredUpazilas,
    districtName,
    upazilaName,
    isLoading: locationLoading,
  } = useDistrictUpazila(selectedDistrict, selectedUpazila);

  /* ---------------- Save Handler ---------------- */
  const onSave = (data) => {
    console.log("Updated Profile:", data);
    setIsEditing(false);
  };

  if (isLoading || locationLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard / Profile</h1>

      <Card>
        {/* Header */}
        <div className="flex justify-end p-4 border-b">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 text-xl"
            >
              <FaEdit />
            </button>
          ) : (
            <div className="flex gap-2">
              <Button outline small onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button small onClick={handleSubmit(onSave)}>
                Save
              </Button>
            </div>
          )}
        </div>

        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <img
                src={profileImage}
                alt="avatar"
                className="w-32 h-32 rounded-full object-cover"
              />

              {isEditing && (
             <div>
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
              )}
            </div>

            {/* Profile Info */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input defaultValue={profile.name} {...register("name")} disabled={!isEditing} />
              </div>

              <div>
                <Label>Email</Label>
                <Input defaultValue={profile.email} {...register("email")} disabled />
              </div>

              {/* District */}
              <div>
                <Label>District</Label>
                {!isEditing ? (
                  <p className="py-2">{districtName}</p>
                ) : (
                  <select
                    {...register("zila", { required: true })}
                    className="border p-2 w-full rounded"
                  >
                    <option value="">Select District</option>
                    {zilas.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                )}
                {errors.zila && (
                  <p className="text-red-500 text-xs">District is required</p>
                )}
              </div>

              {/* Upazila */}
              <div>
                <Label>Upazila</Label>
                {!isEditing ? (
                  <p className="py-2">{upazilaName}</p>
                ) : (
                  <select
                    {...register("upazila", { required: true })}
                    disabled={!selectedDistrict}
                    className="border p-2 w-full rounded"
                  >
                    <option value="">
                      {selectedDistrict
                        ? "Select Upazila"
                        : "Select District first"}
                    </option>
                    {filteredUpazilas.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                )}
                {errors.upazila && (
                  <p className="text-red-500 text-xs">Upazila is required</p>
                )}
              </div>

              {/* Blood Group */}
              <div>
                <Label>Blood Group</Label>
                <select
                  {...register("bloodGroup", { required: true })}
                  disabled={!isEditing}
                  className="border p-2 w-full rounded"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
                {errors.bloodGroup && (
                  <p className="text-red-500 text-xs">
                    Blood group is required
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
