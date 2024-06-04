import React, { useState } from 'react';
import './AuthForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

interface FormFieldsProps {
  onSubmit: (token: string) => void;
}

const FormFields: React.FC<FormFieldsProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [serverResponse, setServerResponse] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);

  const validateEmail = (email: string) => {
    const isValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    return isValid;
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'email' && touchedEmail) {
      setEmailError(!validateEmail(value));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (name === 'email') {
      setTouchedEmail(true);
      setEmailError(!validateEmail(formData.email));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    try {
      const response = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log('Ответ от сервера:', data);

      if (data.token) {
        onSubmit(data.token);
      } else {
        setServerResponse('Ошибка регистрации');
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      setServerResponse('Ошибка сервера');
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label className="form-group__label" htmlFor="name">
          Имя
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-group__input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-group__label" htmlFor="email">
          Электронная почта
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`form-group__input ${emailError ? 'form-group__input--error' : ''}`}
          required
        />
        {emailError && <span className="error-message">Ошибка</span>}
      </div>
      <div className="form-group">
        <label className="form-group__label" htmlFor="password">
          Пароль
        </label>
        <input
          type={passwordVisible ? 'text' : 'password'}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`form-group__input ${passwordMatchError ? 'form-group__input--error' : ''}`}
          required
        />
        {passwordMatchError && <span className="error-message">Ошибка</span>}

        <FontAwesomeIcon
          icon={passwordVisible ? faEye : faEyeSlash}
          onClick={togglePasswordVisibility}
          className="form-group__icon"
        />
      </div>
      <div className="form-group">
        <label className="form-group__label" htmlFor="confirmPassword">
          Повторите пароль
        </label>
        <input
          type={passwordVisible ? 'text' : 'password'}
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          className={`form-group__input ${passwordMatchError ? 'form-group__input--error' : ''}`}
          onChange={handleChange}
          required
        />
        {passwordMatchError && <span className="error-message">Ошибка</span>}

        <FontAwesomeIcon
          icon={passwordVisible ? faEye : faEyeSlash}
          onClick={togglePasswordVisibility}
          className="form-group__icon"
        />
      </div>
      <div className="form-group">
        <button className="submit-button" type="submit">
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
};

export default FormFields;
