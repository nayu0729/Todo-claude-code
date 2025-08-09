import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className = '',
  error,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      <input
        ref={ref}
        className={`form-input ${className} ${error ? 'border-danger' : ''}`}
        {...props}
      />
      {error && (
        <p className="text-danger text-sm mt-1">{error}</p>
      )}
    </div>
  );
});