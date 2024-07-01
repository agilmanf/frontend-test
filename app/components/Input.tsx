import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex">
          {label && <label htmlFor={name}>{label}</label>}
          {props.required && <p className="text-red-500 ml-2">*</p>}
        </div>

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
