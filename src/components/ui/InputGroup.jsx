import React from "react";

export default function InputGroup({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="border-b-2 border-gray-200 py-2 outline-none focus:border-orange transition-colors text-lg placeholder:text-gray-300 bg-transparent"
      />
    </div>
  );
}
