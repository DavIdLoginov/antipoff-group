import React, { useMemo } from 'react';
import './Home.scss';
import UserCard from '../user/UserCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import { useNavigate } from 'react-router-dom';
import { isUserLiked } from '../../store/selectors';
import { useFetchUsers } from './useFetchUsers';
import { User } from '../components.types';

const Home: React.FC = () => {
  const { users, hasMore, loading, handleShowMore, handleLike, handleLogout } = useFetchUsers();
  const navigate = useNavigate();
  const likedUsersState = useSelector((state: RootState) => state.likes);
  const likedUsersStateMemoized = useMemo(() => likedUsersState, [likedUsersState]);

  return (
    <div className="home-container">
      <header className="header">
        <button className="header__logout" onClick={handleLogout}>
          ВЫХОД
        </button>
        <div className="header__content">
          <div className="team-info">
            <h1 className="team-info__header">Наша команда</h1>
            <h2 className="team-info__text">
              Это опытные специалисты, хорошо разбирающиеся во всех задачах,
              которые ложатся на их плечи, и умеющие находить выход из любых,
              даже самых сложных ситуаций.
            </h2>
          </div>
        </div>
      </header>
      <div className="user-container">
        {users.map((user: User) => (
          <UserCard
            key={user.id}
            id={user.id}
            email={user.email}
            name={user.name}
            avatar={`https://i.pravatar.cc/150?u=${user.id}`} // Placeholder avatar
            liked={isUserLiked(likedUsersStateMemoized, user.id) || false}
            onLike={() => handleLike(user.id)}
            onUserClick={(user) =>
              navigate(`/user/${user.id}`, { state: { user } })
            }
          />
        ))}
      </div>
      {hasMore && !loading && (
        <button className="show-more-button" onClick={handleShowMore}>
          Показать еще <FontAwesomeIcon icon={faChevronDown} />
        </button>
      )}
    </div>
  );
};

export default Home;
