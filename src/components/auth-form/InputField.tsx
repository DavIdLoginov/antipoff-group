import React from "react";
import { Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { InputFieldProps } from "../components.types";

const InputField: React.FC<InputFieldProps> = ({
  type,
  id,
  name,
  label,
  passwordVisible,
  onTogglePasswordVisibility,
}) => {
  return (
    <div className="form-group">
      <label className="form-group__label" htmlFor={id}>
        {label}
      </label>
      <div className="password-wrapper">
        <Field
          type={type === "password" && passwordVisible ? "text" : type}
          id={id}
          name={name}
          className="form-group__input"
        />
        {type === "password" && (
          <FontAwesomeIcon
            icon={passwordVisible ? faEye : faEyeSlash}
            onClick={onTogglePasswordVisibility}
            className="form-group__icon"
          />
        )}
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="error-message"
      />
    </div>
  );
};

export default InputField;
