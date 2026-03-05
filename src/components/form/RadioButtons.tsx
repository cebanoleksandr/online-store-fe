import { ErrorMessage, Field, type FieldProps } from "formik";
import { Fragment, type FC, type HTMLAttributes } from "react";
import TextError from "./TextError";
import type { IOption } from "./Select";

interface IProps extends HTMLAttributes<HTMLElement> {
  label: string;
  isError: boolean;
  isTouched: boolean;
  name: string;
  options: IOption[];
}

const RadioButtons: FC<IProps> = ({ label, isError, isTouched, name, options, ...rest }) => {
  return (
    <div className="mb-6 relative">
      <label className={`${isError && isTouched && 'text-red-500'} font-semibold w-full mb-1 block`}>{label}</label>
      <Field
        name={name}
        {...rest}
      >
        {({ field }: FieldProps<string>) => {
          return options.map(option => (
            <Fragment key={option.key}>
              <input 
                type="radio" 
                id={option.value} 
                {...field} 
                value={option.value} 
                checked={field.value === option.value}
                className="mr-2 ml-4"
              />
              <label htmlFor={option.value}>{option.key}</label>
            </Fragment>
          ))
        }}
      </Field>
      <ErrorMessage name={name!}>
        {(msg) => <TextError>{msg}</TextError>}
      </ErrorMessage>
    </div>
  )
}

export default RadioButtons;
