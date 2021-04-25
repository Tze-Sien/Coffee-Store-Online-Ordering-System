import React, {useEffect} from 'react';
import {isAuth} from '../../services/auth';
import {useHistory} from 'react-router-dom';

export const UserAuth = ({children}) => {
  const history = useHistory();
  useEffect(() => {
    if (!isAuth()) {
      history.push('/signin');
    }
  });

  return <>{children}</>;
};
