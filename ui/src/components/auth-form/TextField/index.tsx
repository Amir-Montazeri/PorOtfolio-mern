import React from 'react';

type TextFieldPropTypes = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  field: {
    label: string;
    type: string;
    name: string;
  };
  error?: string | null;
};

const TextField = React.forwardRef<HTMLInputElement, TextFieldPropTypes>(
  ({ field, error, ...props }, ref) => {
    return (
      <>
        <input
          ref={ref}
          placeholder={field.label}
          type={field.type}
          {...props}
          className="textfield-normal text-[#3b4465] border-[#3b4465]"
        />
        {error && <p className="text-red-700 text-xs select-none">{error}</p>}
      </>
    );
  }
);

export default TextField;
