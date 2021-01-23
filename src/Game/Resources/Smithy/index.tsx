import React, { useCallback, useEffect } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { USER_QUERY } from '../../queries';
import { USER_SUBSCRIPTION } from '../../subscriptions';
import { BUY_BLACKSMITH_MUTATION, GATHER_IRON_MUTATION, SELL_IRON_MUTATION, UPGRADE_SMITHY_MUTATION } from '../mutations';
import abbreviate from '@pqt/abbreviate';

export default function Smithy() {
  const { data: queryData, loading: queryLoading, error: queryError } = useQuery(USER_QUERY);
  const { data: subData, error: subError } = useSubscription(USER_SUBSCRIPTION);
  const [gatherIron] = useMutation(GATHER_IRON_MUTATION);
  const [buyBlacksmith] = useMutation(BUY_BLACKSMITH_MUTATION);
  const [sellIron] = useMutation(SELL_IRON_MUTATION);
  const [upgradeSmithy] = useMutation(UPGRADE_SMITHY_MUTATION);
  let user = subData?.userLive || queryData?.me;

  const upgrade = useCallback(() => {
    upgradeSmithy().catch(err => {
      console.log(err);
    });
  }, [upgradeSmithy]);

  const gather = useCallback(() => {
    gatherIron().catch(err => {
      console.log(err);
    });
  }, [gatherIron]);

  const sell = useCallback(() => {
    sellIron().catch(err => {
      console.log(err);
    });
  }, [sellIron]);

  const buy = useCallback((amount) => {
    return () => {
      buyBlacksmith({
        variables: {
          input: {
            amount,
          },
        },
      }).catch(err => {
        console.log(err);
      });
    }
  }, [buyBlacksmith]);

  useEffect(() => {
    gather();
    const intervalId = setInterval(gather, 10100);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  if (queryLoading) {
    return (
      <li>
        <p className="title purple-text">Smithy</p>
        <p>Loading...</p>
      </li>
    );
  }
  
  if (queryError || subError) {
    return (
      <li>
        <p className="title darkblue-text">Smithy</p>
        <p className="red-text">Could not {subError ? 'update' : 'fetch'} your user</p>
      </li>
    );
  }

  const { smithy: { blacksmith, iron, level, cost_1, cost_10, cost_100, cost_level, level_multiplier }, balance } = user;

  return (
    <li>
      <p className="darkblue-text">Smithy [Lvl {level} (x{level_multiplier})]</p>
      <p>&#x1F528; {blacksmith}</p>
      <p>&#x1F529; {iron}</p>
      <div className="row gap">
        <button onClick={buy(1)} disabled={balance < cost_1}>Buy 1 (&#x1F4B0; {abbreviate(cost_1, 2)})</button>
        <button onClick={buy(10)} disabled={balance < cost_10}>Buy 10 (&#x1F4B0; {abbreviate(cost_10, 2)})</button>
        <button onClick={buy(100)} disabled={balance < cost_100}>Buy 100 (&#x1F4B0; {abbreviate(cost_100, 2)})</button>
        <button onClick={sell} disabled={iron === 0} className="green">Sell all &#x1F529; (&#x1F4B0; {abbreviate(iron * 1000000, 2)})</button>
        {level < 5 && <button onClick={upgrade} className="yellow" disabled={balance < cost_level}>Level up &#x2B06; (&#x1F4B0; {abbreviate(cost_level, 2)})</button>}
      </div>
    </li>
  );
}