import React from "react";
import { Link } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { FaHandHoldingUsd, FaTint, FaUsers } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import DonorDashboard from "../Donor/DonorDashBoard/DonorDashboard";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";


const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
const {role ,isRoleLoading} = useRole()
  const { data: myBloodReq = [], isLoading } = useQuery({
    queryKey: ["myBloodReq", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/my-blood-req-latest/${user.email}`
      );
      return result.data;
    },
  });
  
        const {data: allBloodReq = [] } = useQuery({
       queryKey: ['allBloodReq'],
      queryFn : async ()=> {
        const result = await axiosSecure(`${import.meta.env.VITE_API_URL}/all-blood-req`)
        return result.data
      }
    })

          const {data: allUsers = [] } = useQuery({
         queryKey: ['allUsers'],
        queryFn : async ()=> {
          const result = await axiosSecure(`${import.meta.env.VITE_API_URL}/all-users`)
          return result.data
        }
      })
   
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <>
    {
      role === 'donor' &&
      <DonorDashboard user={user} myBloodReq={myBloodReq}></DonorDashboard>
     
    }
   {
    role === 'admin'  && <AdminDashboard user={user} myBloodReq={myBloodReq} allBloodReq={allBloodReq} allUsers={allUsers}></AdminDashboard>
   }
   {
    role === 'volunteer'  && <AdminDashboard user={user} myBloodReq={myBloodReq} allBloodReq={allBloodReq} allUsers={allUsers}></AdminDashboard>
   }
    </>
  );
};

export default DashboardHome;
