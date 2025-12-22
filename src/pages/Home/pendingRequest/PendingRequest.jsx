import React from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "../../../components/Shared/Container";
import PendingReqCart from "./PendingReqCart";
import axios from "axios";
import { Link } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const PendingRequest = () => {
  const { data: allpendingBloodReq = [], isLoading } = useQuery({
    queryKey: ["allpendingBloodReq"],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/pending-blood-req`
      );
      return result.data;
    },
  });

  const feedHome = allpendingBloodReq.slice(0, 3);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="py-16 bg-[#fdfdfd]">
      <Container>
        <div className="max-w-6xl mx-auto px-4 font-sans">
          {/* Header Section */}
          <div className="mb-12 text-center relative">
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight text-brand-red">
              Emergency <span className="text-slate-800">Feed</span>
            </h1>
            <div className="h-1.5 w-24 mx-auto rounded-full mb-4 bg-brand-blue"></div>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Real-time donation requests. Your small contribution can be a
              massive lifeline.
            </p>
          </div>

          {/* Grid Container */}
          {feedHome.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {feedHome.map((request) => (
                <PendingReqCart key={request._id} request={request} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center p-12 rounded-3xl border-2 border-dashed border-brand-blue bg-brand-blue-light">
              <p className="text-slate-500 font-medium italic">
                No emergency requests at the moment.
              </p>
            </div>
          )}
        </div>
      </Container>

      <div className="flex flex-col items-center justify-center mt-12 space-y-6">
        <div className="h-px w-full max-w-md bg-brand-blue/30"></div>

        <Link
          to="/donation-requests"
          className="group relative inline-flex items-center gap-3 px-10 py-4 bg-brand-red text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_10px_20px_-10px_rgba(226,88,67,0.5)] active:scale-95 overflow-hidden"
        >
          <span className="absolute inset-0 w-full h-full bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>

          <span className="relative">See All Blood Requests</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 relative transition-transform duration-300 group-hover:translate-x-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PendingRequest;
