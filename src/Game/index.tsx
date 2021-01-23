import React, { useCallback, useEffect, useState } from 'react';
import { useMutation } from "@apollo/client";
import Cookies from 'js-cookie';

import { LOGIN_MUTATION } from "./mutations";
import Bonuses from './Bonuses';
import UserInfo from './UserInfo';
import Resources from './Resources';
import ActiveBonuses from './ActiveBonuses';

const username = 'testuser';
const password = 'password';

export default function Game() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = useCallback(async () => {
    const { data, errors } = await login({
      variables: {
        input: {
          username,
          password,
        },
      },
    });
    if (!errors) {
      Cookies.set('token', data.login.token);
      setLoggedIn(true);
    }
  }, [login, setLoggedIn]);

  useEffect(() => {
    const loginToken = Cookies.get('token');
    if (!loginToken) {
      handleLogin();
    } else {
      setLoggedIn(true);
    }
  }, []);

  if (loading || !loggedIn) {
    return <p>Logging in...</p>;
  }

  if (error) {
    return <p style={{ whiteSpace: 'pre-wrap' }}>An error occured: {JSON.stringify(error, null, ' ')}</p>;
  }

  return (
    <>
      <div className="column gap">
        <Bonuses />
        <UserInfo />
        <ActiveBonuses />
        <Resources />
      </div>
    </>
  );
}