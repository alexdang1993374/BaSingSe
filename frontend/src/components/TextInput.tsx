import React from "react";

import "./TextInput.css";

export interface Props {
  className?: string;
  id: string;
  isSecondary?: boolean;
  label: string;
  onChange?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
  placeholder?: string;
  readOnly?: boolean;
  type?: "text" | "email" | "password" | "search" | "number" | "url";
  value: string;
}

const TextInput: React.FC<Props> = ({
  className = "",
  id = "",
  label,
  onChange,
  placeholder = "",
  readOnly = false,
  isSecondary = false,
  type = "text",
  value,
}) => (
  <article className={`text-input__container ${isSecondary ? "text-input__secondary" : ""}`}>
    <input
      className={`text-input ${className}`}
      id={id}
      name={label}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      type={type}
      value={value}
      required={true}
    />
    <label className={`text-input__label ${value && "text-input__label-shown"}`} htmlFor={id}>
      {label}
    </label>
  </article>
);

export default TextInput;
