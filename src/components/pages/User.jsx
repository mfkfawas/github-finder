import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import GithubContext from '../../context/github/GithubContext';

const User = () => {
  const { user, getUser } = useContext(GithubContext);

  const params = useParams();

  useEffect(() => {
    getUser(params.username);
  }, [getUser, params.username]);

  return <div>User</div>;
};

export default User;
