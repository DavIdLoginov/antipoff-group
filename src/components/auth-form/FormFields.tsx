import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AuthForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

interface FormFieldsProps {
  onSubmit: (token: string) => void;
}

const FormFields: React.FC<FormFieldsProps> = ({ onSubmit }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverResponse, setServerResponse] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Имя обязательно"),
    email: Yup.string()
      .email("Неправильный формат email")
      .required("Email обязателен"),
    password: Yup.string()
      .required("Пароль обязателен")
      .min(3, "Пароль должен содержать минимум 3 символа")
      .max(10, "Пароль должен содержать максимум 10 символов")
      .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
      .matches(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
      .matches(/\d/, "Пароль должен содержать хотя бы одну цифру")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Пароль должен содержать хотя бы один специальный символ"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Пароли должны совпадать")
      .required("Подтверждение пароля обязательно"),
  });
  
  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();
      console.log("Ответ от сервера:", data);

      if (data.token) {
        onSubmit(data.token);
      } else {
        setServerResponse("Ошибка регистрации");
      }
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      setServerResponse("Ошибка сервера");
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="registration-form">
          <h2 className="registration-form__title">Регистрация</h2>
          <div className="form-group">
            <label className="form-group__label" htmlFor="name">
              Имя
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="form-group__input"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label className="form-group__label" htmlFor="email">
              Электронная почта
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="form-group__input"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label className="form-group__label" htmlFor="password">
              Пароль
            </label>
            <div className="password-wrapper">
              <Field
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                className="form-group__input"
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
                className="form-group__icon"
              />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label className="form-group__label" htmlFor="confirmPassword">
              Повторите пароль
            </label>
            <div className="password-wrapper">
              <Field
                type={passwordVisible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="form-group__input"
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
                className="form-group__icon"
              />
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <button
              className="submit-button"
              type="submit"
              disabled={isSubmitting}
            >
              Зарегистрироваться
            </button>
          </div>
          {serverResponse && (
            <div className="server-response">{serverResponse}</div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default FormFields;
