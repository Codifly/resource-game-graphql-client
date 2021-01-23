import { useMutation, useSubscription } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import abbreviate from "@pqt/abbreviate";

import { LOGIN_MUTATION } from "../Game/mutations";
import { USERS_SUBSCRIPTION } from "./subscriptions";

const username = 'username';
const password = 'password';

export default function Scoreboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const { data, error: subError } = useSubscription(USERS_SUBSCRIPTION);

  const usersLive = data?.usersLive || [];

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

  if (error || subError || loading) {
    return null;
  }

  return usersLive.sort((a: any, b: any) => {
    if (a.balance < b.balance) return 1;
    if (a.balance > b.balance) return -1;
    return 0;
  }).map(({ username, balance, id }: any, index: number) => (
    <div className="box" key={id}>
      <div className="row">
        <div className="column">
          <p>{index + 1} {username}</p>
        </div>
        <div className="column">
          <p>&#x1F4B0; {abbreviate(balance, 2)}</p>
        </div>
      </div>
    </div>
  ));
}