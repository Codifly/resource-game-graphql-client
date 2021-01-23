import React from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { USER_QUERY } from '../queries';
import { USER_SUBSCRIPTION } from '../subscriptions';
import abbreviate from '@pqt/abbreviate';

export default function Bonuses() {
  const { data: queryData, loading: queryLoading, error: queryError } = useQuery(USER_QUERY);
  const { data: subData, error: subError } = useSubscription(USER_SUBSCRIPTION);
  let user = subData?.userLive || queryData?.me;

  if (queryLoading) {
    return (
      <div className="box">
        <p className="title purple-text">User Info</p>
        <p>Loading...</p>
      </div>
    );
  }
  
  if (queryError || subError) {
    return (
      <div className="box">
        <p className="title purple-text">User Info</p>
        <p className="red-text">Could not {subError ? 'update' : 'fetch'} your user</p>
      </div>
    );
  }

  const { username, balance } = user

  return (
    <div className="box">
      <p className="title purple-text">User Info</p>
      <div className="row">
        <div className="column">
          <p>{username}</p>
        </div>
        <div className="column">
          <p>&#x1F4B0; {abbreviate(balance, 2)}</p>
        </div>
      </div>
    </div>
  );
}