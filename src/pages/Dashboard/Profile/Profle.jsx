import { useEffect, useState } from "react";
import CardContent from "../../../components/Shared/CardContent/CardContent";
import { useQuery } from '@tanstack/react-query'
import Card from "../../../components/Shared/Card/Card";
import Label from "../../../components/Shared/Label/Label";
import Button from "../../../components/Shared/Button/Button";
import Input from "../../../components/Shared/Input/Input";
import { FaEdit } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useForm } from "react-hook-form";

const Profile = () => {
  
    const [zilas, setZilas] = useState([]); // Zilas (District) data
    const [upazilas, setUpazilas] = useState([]); // All Upazilas data
  
    // Destructure useForm, including formState.errors for validation messages
    const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
    } = useForm();
  const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
    name: "",
    email: "",
    image: "",
    district: "",
    upazila: "",
    bloodGroup: "",
  });
  const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
  const {data = [] ,isLoading} = useQuery({
     queryKey: ['profile', user?.email],
    queryFn : async ()=> {
      const result = await axiosSecure(`/profile`)
      return result.data
    }
  })
  console.log(data)

   useEffect(() => {
    if (data ) {
      setProfile({
        name: data.name,
        email: data.email,
        image: data.image,
        district: data.zila,
        upazila: data.upazila,
        bloodGroup: data.bloodGroup,
      });
    }
  }, [data]);
  
  
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
              setValue("zila", zilaData[0].id); 
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }, [setValue]);
    const selectedDistrict = watch("zila");
  
    const filteredUpazilas = upazilas.filter(
      (upazila) => upazila.district_id === selectedDistrict
    );
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

 


 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const onSave = () => {
    // TODO: API call
    setIsEditing(false);
  };
   if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard / Profile</h1>

      <Card>
        {/* 🔹 Header with Edit Button */}
        <div className="flex justify-end p-4 border-b">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 text-xl hover:opacity-80"
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
                src={profile.image}
                alt="avatar"
                className="w-32 h-32 rounded-full object-cover"
              />

              {isEditing && (
                  <div>
           
              <input
                name="image"
              
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
         
            </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  name="name"
                  {...register('name')}
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input value={profile.email} disabled {...register('email')} />
              </div>
                <div>
              <label className="block mb-1 text-sm">District</label>
              <select
                {...register("zila", { required: "District is required" })}
                defaultValue=""
                className="w-full px-3 py-2 border-[#2C9AD5] rounded-md bg-gray-100"
              disabled={!isEditing}
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
              {errors.zila && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.zila.message}
                </p>
              )}
            </div>
                <div>
              <label className="block mb-1 text-sm">Upazila</label>
              <select
                {...register("upazila", { required: "Upazila is required" })}
                defaultValue=""
                className="w-full px-3 py-2 border-[#2C9AD5] rounded-md bg-gray-100"
                 disabled={!isEditing}
                // Disable if no district is selected or no upazilas are available
             
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
                {profile.bloodGroup}
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
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
