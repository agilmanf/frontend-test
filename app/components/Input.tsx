import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={name}>{label}</label>
        <input
          ref={ref}
          className="border p-2 rounded"
          id={name}
          name={name}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
