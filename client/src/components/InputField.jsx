import { useState } from "react";
import { RiEyeLine } from "react-icons/ri";
import { RiEyeOffLine } from "react-icons/ri";

const InputField = ({
  labelName,
  onChange,
  type,
  placeholder,
  value,
  disabled,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleChange = (e) => {
    if (onChange) onChange(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="min-w-60 flex flex-col gap-1.5">
      <label
        htmlFor={labelName}
        className="block mb-1  font-semibold  text-md rtl:text-right ltr:text-left"
      >
        {labelName || "no label"}
      </label>
      <div className="relative">
        <input
          type={type === "password" && passwordVisible ? "password" : "text"}
          id={labelName}
          value={value}
          onChange={handleChange}
          className="bg-white text-black border-2 border-gray-300 focus:border-[#04AA6D] outline-none text-sm rounded-lg block w-full p-2.5  "
          placeholder={placeholder || ""}
          required
          disabled={disabled}
        />
        {type === "password" && (
          <div
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 transform -translate-y-1/2 cursor-pointer text-[#04AA6D] rtl:left-3 ltr:right-3"
          >
            {passwordVisible ? (
              <RiEyeOffLine size={20} />
            ) : (
              <RiEyeLine size={20} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
