// import React from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}

export default function Input({ value, onChange, placeholder, type = "text" }: Props) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="input"
    />
  );
}
