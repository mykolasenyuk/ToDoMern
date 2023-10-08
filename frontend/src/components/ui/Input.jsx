import React, { useState } from "react";

export default function Input({
  name,
  id,
  onChange,
  inputClass,
  labelClass,
  defaultValue,
  value,
  type,
  required,
  title,
  disabled,
  isSubmitted,
  isNotValid,
}) {
  return (
    <>
      <label htmlFor={id} className={`text-lg capitalize ${labelClass}`}>
        {name}:
        <input
          id={id}
          className={`${inputClass} focus:outline-none focus:border-blue-200   ${
            isSubmitted && required && (!value || isNotValid)
              ? " border-red-500 focus:border-red-500"
              : ""
          }`}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
          required={required}
          title={title}
          disabled={disabled}
        />
        <span
          className={` ${
            isSubmitted && required && (!value || isNotValid)
              ? "block text-sm  text-right text-red-500"
              : " hidden"
          } `}
        >
          {isNotValid
            ? value
              ? "Wrong pattern"
              : "Required"
            : !value && "Required"}
        </span>
      </label>
    </>
  );
}
