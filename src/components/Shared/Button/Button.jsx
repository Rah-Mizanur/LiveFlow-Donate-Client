const Button = ({
  label,
  children,
  onClick,
  type = "button",
  disabled = false,
  outline = false,
  small = false,
  icon: Icon,
  className = "",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        w-full
        rounded-lg
        transition
        hover:opacity-80
        disabled:opacity-70
        disabled:cursor-not-allowed

        ${outline ? "bg-white" : "bg-[#8A1E27]"}
        border
        border-[#8A1E27]
        ${outline ? "text-[#8A1E27]" : "text-white"}

        ${small ? "py-1 text-sm font-light" : "py-3 text-md font-semibold"}
        px-4

        ${className}
      `}
    >
      {Icon && (
        <Icon
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2"
        />
      )}

      {/* label OR children */}
      <span className={Icon ? "pl-6" : ""}>
        {label || children}
      </span>
    </button>
  );
};

export default Button;
