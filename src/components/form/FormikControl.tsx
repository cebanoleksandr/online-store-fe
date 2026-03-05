import type { FC, HTMLAttributes } from "react";
import type { IOption } from "./Select";
import Input from "./Input";
import Textarea from "./Textarea";
import Select from "./Select";
import RadioButtons from "./RadioButtons";
import Checkbox from "./Checkbox";
import FormikDatePicker from "./DatePicker";

interface IProps extends HTMLAttributes<HTMLElement> {
  control: 'input' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';
  label: string;
  placeholder?: string;
  type?: 'email' | 'text' | 'password'
  name: string;
  isError: boolean;
  isTouched: boolean;
  options?: IOption[];
}

const FormikControl: FC<IProps> = ({
  control,
  isError,
  isTouched,
  label,
  name,
  placeholder = '',
  type = 'text',
  options = [],
  ...rest
}) => {
  switch (control) {
    case 'input':
      return (
        <Input
          {...rest} 
          label={label} 
          placeholder={placeholder} 
          type={type}
          name={name}
          isError={isError}
          isTouched={isTouched}
        />
      );
    case 'textarea':
      return (
        <Textarea
          {...rest} 
          label={label} 
          placeholder={placeholder} 
          name={name}
          isError={isError}
          isTouched={isTouched}
        />
      );
    case 'select':
      return (
        <Select
          {...rest} 
          label={label}
          name={name}
          isError={isError}
          isTouched={isTouched}
          options={options}
        />
      );
    case 'radio':
      return (
        <RadioButtons 
          {...rest} 
          label={label}
          name={name}
          isError={isError}
          isTouched={isTouched}
          options={options}
        />
      );
    case 'checkbox':
      return (
        <Checkbox
          {...rest} 
          label={label}
          name={name}
          isError={isError}
          isTouched={isTouched}
          options={options}
        />
      );
    case 'date':
      return (
        <FormikDatePicker
          label={label}
          name={name}
          isError={isError}
          isTouched={isTouched}
        />
      );
  
    default:
      return null;
  }
}

export default FormikControl;
