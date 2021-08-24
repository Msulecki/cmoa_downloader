import { IFormInput } from '.';

const FormInput = (props: IFormInput) => {
  const { type, name, placeholder, icon, alt } = props;
  return (
    <div className='form__group'>
      <input placeholder={placeholder} type={type} name={name} required />
      <div className='form__icon'>
        <img src={icon} alt={alt} />
      </div>
    </div>
  );
};

export default FormInput;
