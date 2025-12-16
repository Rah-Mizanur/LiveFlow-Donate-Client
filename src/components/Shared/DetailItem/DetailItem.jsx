const DetailItem = ({ label, value, className = '' }) => (
    <div className="flex justify-between py-2 border-b border-gray-100">
        <span className="text-gray-500 font-medium">{label}</span>
        <span className={`text-gray-800 ${className}`}>{value}</span>
    </div>
  )

  export default DetailItem