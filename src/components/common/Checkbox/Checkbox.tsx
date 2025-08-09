import React, { InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className = '',
  id,
  ...props
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="checkbox">
        <input
          type="checkbox"
          id={checkboxId}
          {...props}
        />
        <span className="checkbox-custom"></span>
      </div>
      {label && (
        <label
          htmlFor={checkboxId}
          className="cursor-pointer select-none"
        >
          {label}
        </label>
      )}
    </div>
  );
};