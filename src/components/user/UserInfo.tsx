import React from 'react';
import './UserInfo.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeToken } from '../../store/actions';
import email_icon from '../../assets/email_icon.svg';
import phone_icon from '../../assets/phone_icon.svg';
import { data } from './userData';

const UserDetails: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useLocation().state;
  const { id, email, name, avatar } = user;

  const goBack = () => {
    navigate('/home');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(removeToken());
    console.log('Token removed, we are going back to main');
    navigate('/');
  };

  console.log('User ID from URL:', id, name);

  const userData = data[0];

  return (
    <div>
      <header className="user-details-header">
        <div className="user-details-header__container">
          <button onClick={goBack} className="back-button">
            Назад
          </button>
          <button onClick={handleLogout} className="logout-button">
            Выход
          </button>
          <div className="user-info">
            <div className="user-avatar">
              <img className="user-avatar__icon" src={avatar} alt={name} />
            </div>
            <div className="user-info-data">
              <h1 className="user-info-name">{name}</h1>
              <h3 className="user-info-description">Партнер</h3>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="container-main">
          <div className="user-details-content">
            <p className="user-details-text">{userData.userText.p1}</p>
            <p className="user-details-text">{userData.userText.p2}</p>
            <p className="user-details-text">{userData.userText.p3}</p>
          </div>
          <div className="user-details-contacts">
            <div className="user-details-contact">
              <img src={phone_icon} alt="Телефон" className="contact-icon" />
              <p className="contact-text">{userData.userNumber}</p>
            </div>
            <div className="user-details-contact">
              <img src={email_icon} alt="Email" className="contact-icon" />
              <p className="contact-text">{email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDetails;
