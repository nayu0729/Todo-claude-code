import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'danger' | 'outline';
  size?: 'sm' | 'md';
  children: ReactNode;
  isActive?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  isActive = false,
  children,
  ...props
}) => {
  const getButtonClasses = () => {
    const baseClasses = 'btn';
    const variantClasses = {
      primary: 'btn-primary',
      success: 'btn-success',
      danger: 'btn-danger',
      outline: `btn-outline ${isActive ? 'active' : ''}`,
    };
    const sizeClasses = {
      sm: 'btn-sm',
      md: '',
    };

    return [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className,
    ].filter(Boolean).join(' ');
  };

  return (
    <button
      className={getButtonClasses()}
      {...props}
    >
      {children}
    </button>
  );
};