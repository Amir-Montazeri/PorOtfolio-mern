import React, { FC } from 'react';
import TextFields from './TextFields';
import { useForm } from 'react-hook-form';

interface AuthFormPropTypes {
  fields: {
    label: string;
    type: string;
    name: string;
  }[];
  submitText: string;
  isActive: boolean;
  side: 'left' | 'right';
}

type FormValuTypes = {
  email: string;
  password: string;
};

const AuthForm: FC<AuthFormPropTypes> = ({
  isActive,
  fields,
  submitText,
  side,
}) => {
  const { handleSubmit, register } = useForm();
  const setCenterBaseOnSide = () =>
    side === 'left'
      ? 'translate-x-[35%] md:translate-x-[40%]'
      : 'translate-x-[-35%] md:translate-x-[-40%]';

  return (
    <form
      className={`p-[15px] h-[400px] max-w-[93vw] transition-all duration-[.5s] flex flex-col rounded-[13px] overflow-hidden ${
        isActive
          ? `bg-white w-[320px] z-[2] opacity-100 ${setCenterBaseOnSide()} shadow-md`
          : 'bg-[#d7e7f1] !h-[310px] w-[220px] z-[1] opacity-50 translate-y-[20px] dr-children:opacity-0'
      }`}
      onSubmit={handleSubmit((e) => console.log(e))}
    >
      {fields.map((field) => (
        <TextFields field={field} {...register(field.name)} key={field.name} />
      ))}
      <button
        type="submit"
        className="mt-auto py-[10px] text-white w-full bg-[#3b4465] rounded-lg"
      >
        {submitText}
      </button>
    </form>
  );
};

export default AuthForm;
