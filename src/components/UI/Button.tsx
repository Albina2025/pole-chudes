import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

export default function Button({ children, onClick, type = "button", className }: Props) {
  return (
    <button 
        type={type} 
        onClick={onClick} 
        className={`btn ${className}`}>
        {children}
    </button>
  );
}

