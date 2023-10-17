import React from "react";
import { useFormContext } from "react-hook-form";
import { findInputError, isFormInvalid } from "../../utils";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";

const Input = ({
  name,
  label,
  type,
  id,
  placeholder,
  tickValidation,
  validation,
  multiline,
  className,
  onChange,
  value,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const InputError = ({ message }) => {
    return (
      <motion.p
        className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
        {...framer_error}
      >
        {/* <MdError /> */}
        {message}
      </motion.p>
    );
  };

  const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
  };

  const inputErrors = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);

  const input_tailwind =
    "p-5 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60";

  return (
    <div className={cn("flex flex-col w-full gap-2")}>
      <div className="flex justify-between">
        <label htmlFor={id} className="label-input font-semibold capitalize ">
          {label}
          <span className="tickValidation">{tickValidation}</span>
        </label>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputErrors.error.message}
              key={inputErrors.error.message}
            />
          )}
        </AnimatePresence>
      </div>
      {multiline ? (
        <textarea
          id={id}
          type={type}
          className={cn(input_tailwind, "min-h-[10rem] max-h-[20rem] resize-y")}
          placeholder={placeholder}
          {...register(`${name}`, validation)}
          onChange={onChange}
        >
          {value}
        </textarea>
      ) : (
        <input
          id={id}
          type={type}
          className={className}
          placeholder={placeholder}
          {...register(name, validation)}
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
};

export default Input;
