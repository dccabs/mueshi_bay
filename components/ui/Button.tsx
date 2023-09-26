import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}
export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const buttonClass = classNames({
    "rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50":
      variant === "secondary",
    "rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500":
      true,
    "opacity-50 cursor-not-allowed": disabled,
  });
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={buttonClass}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
}
