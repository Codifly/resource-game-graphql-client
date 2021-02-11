import React from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { USER_QUERY } from '../queries';
import { USER_SUBSCRIPTION } from '../subscriptions';

export default function ActiveBonuses() {
  const { data: queryData, loading: queryLoading, error: queryError } = useQuery(USER_QUERY);
  const { data: subData, error: subError } = useSubscription(USER_SUBSCRIPTION);

  let user = subData?.userLive || queryData?.me;

  if (queryLoading) {
    return (
      <div className="box">
        <p className="title blue-text">Active bonuses</p>
        <p>Loading...</p>
      </div>
    );
  }
  
  if (queryError || subError) {
    return (
      <div className="box">
        <p className="title blue-text">Active bonuses</p>
        <p className="red-text">Could not {subError ? 'update' : 'fetch'} your user</p>
      </div>
    );
  }

  const { activeBonuses } = user

  return (
    <div className="box">
      <p className="title blue-text">Active bonuses</p>
      {activeBonuses.length === 0 && <p>You do not have any active bonuses</p>}
      <ul>
        {activeBonuses.map(({ activeUntil, bonus: { type, multiplier, description, target } }: any) => (
          <li>
            <div className="row">
              <div className="column">
                <p className={target === 'YOURSELF' ? 'green-text' : 'red-text'}>(&#x23F1; 00s) {type} x{multiplier}, {description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}