import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import { useNavigate } from 'react-router-dom';
import { removeToken, addLike, removeLike } from '../../store/actions';
import { User } from '../components.types';

export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const likedUsers = useSelector((state: RootState) => state.likes.likes.likedUsers);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchUsers = async (page: number) => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5`);
        const data = await response.json();
        if (data.length > 0) {
          setUsers((prevUsers) => [...prevUsers, ...data]);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        alert(`Ошибка загрузки пользователей: ${error}`);
      }
    };

    fetchUsers(page);
  }, [page]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(removeToken());
    console.log('Token removed, we are going back to main');
    navigate('/');
  };

  const handleLike = (userId: number) => {
    if (likedUsers && likedUsers.includes(userId)) {
      dispatch(removeLike(userId));
      console.log('User #', userId, 'remove a LIKE!');
    } else {
      dispatch(addLike(userId));
      console.log('User #', userId, 'got a LIKE!');
    }
  };

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
    setLoading(true);
  };

  return { users, hasMore, loading, handleShowMore, handleLike, handleLogout };
};
