import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

import MainLayout from "../layouts/MainLayout";

import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Dashboard/Profile/Profle";
import DonorDashboard from "../pages/Dashboard/Donor/DonorDashBoard/DonorDashboard";
import MyDonationRequests from "../pages/Dashboard/Donor/MydonationRequests/MyDonationRequests";
import CreateDonationRequests from "../pages/Dashboard/Donor/CreateDonation/CreateDonationRequests";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import AllBloodDonationRequest from "../pages/Dashboard/Admin/AllBloodDonationRequset/AllBloodDonationRequest";
import EditRequest from "../pages/Dashboard/EditRequest/EditRequest";
import BloodRequestDetails from "../pages/Dashboard/BloodRequestDetails/BloodRequestDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path :'request/:id',
        element : <BloodRequestDetails></BloodRequestDetails>
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
    
  {
    path :'/dashboard',
    element : <DashboardLayout></DashboardLayout>,
    children : [
      {
        index : true ,
        element : <DonorDashboard></DonorDashboard>
      },
      {
        path : 'profile',
        element : <Profile></Profile>
      },
      {
        path :'my-donation-requests',
        element : <MyDonationRequests></MyDonationRequests>
      },
      {
        path :'create-donation-request',
        element : <CreateDonationRequests></CreateDonationRequests>
      },
      {
        path :'all-users',
        element : <AllUsers></AllUsers>
      },{
        path:'all-blood-donation-request',
        element: <AllBloodDonationRequest></AllBloodDonationRequest>
      },
      {
        path : 'edit-request/:id',
        element : <EditRequest></EditRequest>
      },
    
    ]
  }

]);
