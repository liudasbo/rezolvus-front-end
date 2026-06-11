interface AuthInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "search" | "url" | "number";
  error?: string;
}

export default function AuthInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
}: AuthInputProps) {
  return (
    <div className="flex flex-col gap-[4px] w-full">
      <label
        htmlFor={id}
        className="text-[14px] font-medium leading-[20px] text-[#1c1c1c] whitespace-nowrap"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        className="h-[48px] rounded-[8px] bg-[rgba(13,13,13,0.05)] px-[16px] text-[14px] leading-[20px] text-[#1c1c1c] placeholder:text-[#a3a29f] outline-none focus-visible:ring-2 focus-visible:ring-[#013d47]/40 w-full border-0"
      />
      {error && (
        <p id={`${id}-error`} className="text-[12px] leading-[20px] text-[#fb652b]">
          {error}
        </p>
      )}
    </div>
  );
}
