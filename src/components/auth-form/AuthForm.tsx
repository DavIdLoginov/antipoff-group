import React from 'react';
import './AuthForm.scss';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/actions';
import { useNavigate } from 'react-router-dom';
import FormFields from './FormFields';

const AuthForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (token: string) => {
    dispatch(setToken(token));
    navigate('/home');
  };

  return (
    <div className="registration-form-container">
      <FormFields onSubmit={handleSubmit} />
    </div>
  );
};

export default AuthForm;
