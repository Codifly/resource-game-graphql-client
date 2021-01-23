import React, { useCallback } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { AVAILABLE_BONUSES_QUERY } from './queries';
import { AVAILABLE_BONUSES_SUBSCRIPTION } from './subscriptions';
import abbreviate from '@pqt/abbreviate';
import { BUY_BONUS_MUTATION } from './mutations';
import { USER_QUERY } from '../queries';
import { USER_SUBSCRIPTION } from '../subscriptions';

export default function Bonuses() {
  const { data: queryData, loading: queryLoading, error: queryError } = useQuery(AVAILABLE_BONUSES_QUERY);
  const { data: subData, error: subError } = useSubscription(AVAILABLE_BONUSES_SUBSCRIPTION);
  const [buyBonus] = useMutation(BUY_BONUS_MUTATION);

  let availableBonuses = subData?.availableBonusesLive || queryData?.availableBonuses;

  const { data: userQueryData, loading: userQueryLoading, error: userQueryError } = useQuery(USER_QUERY);
  const { data: userSubData, error: userSubError } = useSubscription(USER_SUBSCRIPTION);

  let user = userSubData?.userLive || userQueryData?.me;

  const buy = useCallback((id) => {
    return () => {
      buyBonus({
        variables: {
          input: {
            id,
          },
        },
      }).catch(err => {
        console.log(err);
      });
    }
  }, [buyBonus]);

  if (queryLoading || userQueryLoading) {
    return (
      <div className="box">
        <p className="title cyan-text">Bonuses</p>
        <p>Loading...</p>
      </div>
    );
  }
  
  if (queryError || subError || userQueryError || userSubError) {
    return (
      <div className="box">
        <p className="title cyan-text">Bonuses</p>
        <p className="red-text">Could not {subError ? 'update' : 'fetch'} available bonuses</p>
      </div>
    );
  }

  const { activeBonuses, balance } = user;

  return (
    <div className="box">
      <p className="title cyan-text">Bonuses</p>
      {availableBonuses.length === 0 && <p>There are no bonuses available for you</p>}
      <ul>
        {availableBonuses
        .filter(({ id }: any) => !activeBonuses.find(({ bonus: { id: activeId } }: any) => activeId === id))
        .map((bonus: any) => (
          <li key={bonus.id}>
            <div className="row">
              <div className="column">
                <p>{bonus.type}</p>
                <p>&#x23F1; {bonus.duration}s</p>
                <p>&#x231B; {bonus.availableUntil}</p>
              </div>
              <div className="column">
                <p>Target: {bonus.target}</p>
                <p>Lvl {bonus.level}: x{bonus.multiplier}</p>
              </div>
            </div>
            <p>{bonus.description}</p>
            <div className="row gap">
              <button onClick={buy(bonus.id)} disabled={balance < bonus.cost}>Buy (&#x1F4B0; {abbreviate(bonus.cost, 2)})</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}