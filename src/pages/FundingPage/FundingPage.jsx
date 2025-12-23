import { useState } from "react";
import Container from "../../components/Shared/Container";
import PaymentModal from "../../components/Dashboard/Modal/PaymentModal";
import { FaHandHoldingHeart, FaHistory, FaPlusCircle } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import FundingTableRows from "../../components/Dashboard/TableRows/FundingTableRows";

const FundingPage = () => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const axiosSecure = useAxiosSecure();

  const { data: funding = [], isLoading } = useQuery({
    queryKey: ["funding"],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/funding`
      );
      return result.data;
    },
  });


 const totalAmount = Array.isArray(funding)
  ? funding.reduce((sum, d) => sum + (d.amount || 0), 0)
  : 0;

 
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="min-h-screen bg-slate-50/50 py-10">
      <Container>
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">
                Funding <span className="text-brand-red">Log</span>
              </h1>
              <p className="text-slate-500 mt-1">
                Transparency in every drop of contribution.
              </p>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-red text-white font-bold shadow-lg shadow-brand-red/20 transition-all hover:scale-105 active:scale-95"
            >
              <FaPlusCircle className="text-xl group-hover:rotate-90 transition-transform" />
              Give Fund
            </button>
          </div>

          <PaymentModal closeModal={closeModal} isOpen={isOpen} />

          {/* Stats & Total Fund Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-1 rounded-3xl border border-brand-blue bg-white shadow-sm p-8 relative overflow-hidden group">
              <FaHandHoldingHeart className="absolute -right-4 -bottom-4 text-9xl text-brand-blue/10 rotate-12 group-hover:scale-110 transition-transform" />

              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                Total Funds Collected
              </p>
              <h2 className="text-5xl font-black text-slate-800">
                <span className="text-brand-red">৳</span> {totalAmount}
              </h2>
              <div className="mt-4 flex items-center gap-2 text-sm text-brand-red font-bold">
                <div className="h-2 w-2 rounded-full bg-brand-red animate-pulse"></div>
                Live Statistics
              </div>
            </div>

            {/* Optional secondary info card */}
            <div className="lg:col-span-2 rounded-3xl bg-brand-blue-light border border-brand-blue/30 p-8 flex items-center">
              <p className="text-slate-700 leading-relaxed italic">
                "Your financial support covers logistics, storage, and emergency
                transportation of blood to remote areas. Every Taka helps us
                save a life."
              </p>
            </div>
          </div>

          {/* Funding Table Section */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center gap-2">
              <FaHistory className="text-brand-red" />
              <h3 className="font-bold text-slate-800">Recent Transactions</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-brand-blue/20 text-slate-700">
                  <tr>
                    <th className="px-6 py-4 font-bold text-sm uppercase">
                      Donor Name
                    </th>
                    <th className="px-6 py-4 font-bold text-sm uppercase">
                      Email Address
                    </th>
                    <th className="px-6 py-4 font-bold text-sm uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-4 font-bold text-sm uppercase text-right">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {/* Static Row Example */}
                  {funding.map((fund) => (
                    <FundingTableRows key={fund._id} fund={fund}></FundingTableRows>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FundingPage;
