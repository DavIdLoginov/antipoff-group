import React, { useState } from "react";
import { Formik, Form } from "formik";
import "./AuthForm.scss";
import { validationSchema } from "./ValidationSchema";
import InputField from "./InputField";

interface FormFieldsProps {
  onSubmit: (token: string) => void;
}

const FormFields: React.FC<FormFieldsProps> = ({ onSubmit }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverResponse, setServerResponse] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  
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
          <InputField
            type="text"
            id="name"
            name="name"
            label="Имя"
          />
          <InputField
            type="email"
            id="email"
            name="email"
            label="Электронная почта"
          />
          <InputField
            type="password"
            id="password"
            name="password"
            label="Пароль"
            passwordVisible={passwordVisible}
            onTogglePasswordVisibility={togglePasswordVisibility}
          />
          <InputField
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            label="Повторите пароль"
            passwordVisible={passwordVisible}
            onTogglePasswordVisibility={togglePasswordVisibility}
          />
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