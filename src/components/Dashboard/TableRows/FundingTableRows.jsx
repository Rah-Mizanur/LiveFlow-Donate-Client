import React from 'react'

const FundingTableRows = ({fund}) => {
    const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

  return (

      <tr className="hover:bg-brand-blue-light/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-800">{fund.donor}</div>
                    </td>
                    <td className="px-6 py-5 text-slate-500">
                      {fund.donorEmail}
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 font-bold text-sm">
                        {fund.amount}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right text-slate-500 font-medium text-sm">
                      {formatDate(fund.donateAt)}
                    </td>
                  </tr>
    
  )
}

export default FundingTableRows
