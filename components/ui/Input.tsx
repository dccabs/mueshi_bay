interface InputProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  error?: boolean;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  id,
  name,
  type = "text",
  placeholder = "",
  defaultValue = "",
  error = false,
  errorMessage = "",
  onChange,
}: InputProps) {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-white"
      >
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          onChange={onChange}
          type={type}
          name={name}
          id={id}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          defaultValue={defaultValue}
          aria-invalid="false"
          aria-describedby="email-error"
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
