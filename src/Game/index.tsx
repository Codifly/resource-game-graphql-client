import React, { useCallback, useEffect, useState } from 'react';
import { useMutation } from "@apollo/client";
import Cookies from 'js-cookie';

import { LOGIN_MUTATION } from "./mutations";
import Bonuses from './Bonuses';
import UserInfo from './UserInfo';
import Resources from './Resources';
import ActiveBonuses from './ActiveBonuses';

const username = 'username';
const password = 'password';

export default function Game() {
  const [loggedIn, setLoggedIn] = useState(false);
  // Create login mutation here.

  return null;

  // if (loading || !loggedIn) {
  //   return <p>Logging in...</p>;
  // }

  // if (error) {
  //   return <p style={{ whiteSpace: 'pre-wrap' }}>An error occured: {JSON.stringify(error, null, ' ')}</p>;
  // }

  // return (
  //   <>
  //     <div className="column gap">
  //       {/* <Bonuses /> */}
  //       <UserInfo />
  //       {/* <ActiveBonuses /> */}
  //       <Resources />
  //     </div>
  //   </>
  // );
}