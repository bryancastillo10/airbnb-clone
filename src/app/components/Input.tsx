import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { TbCurrencyPeso } from "react-icons/tb";

interface InputProps{
    id: string;
    label: string;
    type?: string;
    disabled: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input = ({ id, label,type,disabled,formatPrice,required,register,errors}:InputProps) => {
  return (
      <div className="w-full relative">
        {formatPrice && (<TbCurrencyPeso size={24} className="text-neutral-7000 absolute top-5 left-2" />)}
          <input id={id} disabled={disabled} {...register(id, { required })}
              placeholder=" "
              type={type}
              className={`
                peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled disabled:opacity-70 disabled:opacity-not-allowed
                ${formatPrice ? "pl-9" : "pl-4"}
                ${errors[id] ? "border-rose-500 focus:border-rose-500":"border-neutral-300 focus:border-black"}
                `}
          />
          <label className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] 
                ${formatPrice ? "left-9" : "left-4"}
                ${errors[id] ? "text-rose-500":"text-zinc-400"}
                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                peer-focus:scale-75 peer-focus:-translate-y-4
                `}>
              {label}</label>
    </div>
  )
}

export default Input;
