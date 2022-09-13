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
};

const TextFields = React.forwardRef<HTMLInputElement, TextFieldPropTypes>(
  ({ field, ...props }, ref) => (
    <input
      ref={ref}
      placeholder={field.label}
      type={field.type}
      {...props}
      className="textfield-normal text-[#3b4465] border-[#3b4465]"
    />
  )
);

export default TextFields;
