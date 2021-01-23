import React, { useCallback, useEffect } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { USER_QUERY } from '../../queries';
import { USER_SUBSCRIPTION } from '../../subscriptions';
import { BUY_MINER_MUTATION, GATHER_STONE_MUTATION, SELL_STONE_MUTATION, UPGRADE_MINE_MUTATION } from '../mutations';
import abbreviate from '@pqt/abbreviate';

export default function Mine() {
  const { data: queryData, loading: queryLoading, error: queryError } = useQuery(USER_QUERY);
  const { data: subData, error: subError } = useSubscription(USER_SUBSCRIPTION);
  const [gatherStone] = useMutation(GATHER_STONE_MUTATION);
  const [buyMiner] = useMutation(BUY_MINER_MUTATION);
  const [sellStone] = useMutation(SELL_STONE_MUTATION);
  const [upgradeMine] = useMutation(UPGRADE_MINE_MUTATION);
  let user = subData?.userLive || queryData?.me;

  const upgrade = useCallback(() => {
    upgradeMine().catch(err => {
      console.log(err);
    });
  }, [upgradeMine]);

  const gather = useCallback(() => {
    gatherStone().catch(err => {
      console.log(err);
    });
  }, [gatherStone]);


  const sell = useCallback(() => {
    sellStone().catch(err => {
      console.log(err);
    });
  }, [sellStone]);

  const buy = useCallback((amount) => {
    return () => {
      buyMiner({
        variables: {
          input: {
            amount,
          },
        },
      }).catch(err => {
        console.log(err);
      });
    }
  }, [buyMiner]);

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
        <p className="title darkgray-text">Mine</p>
        <p>Loading...</p>
      </li>
    );
  }
  
  if (queryError || subError) {
    return (
      <li>
        <p className="title darkgray-text">Mine</p>
        <p className="red-text">Could not {subError ? 'update' : 'fetch'} your user</p>
      </li>
    );
  }

  const { mine: { miner, stone, level, cost_1, cost_10, cost_100, cost_level, level_multiplier }, balance } = user;

  return (
    <li>
      <p className="darkgray-text">Mine [Lvl {level} (x{level_multiplier})]</p>
      <p>&#x26CF; {miner}</p>
      <p>&#x1F9F1; {stone}</p>
      <div className="row gap">
        <button onClick={buy(1)} disabled={balance < cost_1}>buy 1 (&#x1F4B0; {abbreviate(cost_1, 2)})</button>
        <button onClick={buy(10)} disabled={balance < cost_10}>buy 10 (&#x1F4B0; {abbreviate(cost_10, 2)})</button>
        <button onClick={buy(100)} disabled={balance < cost_100}>buy 100 (&#x1F4B0; {abbreviate(cost_100, 2)})</button>
        <button onClick={sell} disabled={stone === 0} className="green">Sell all &#x1F9F1; (&#x1F4B0; {abbreviate(stone * 1000, 2)})</button>
        {level < 5 && <button onClick={upgrade} className="yellow" disabled={balance < cost_level}>Level up &#x2B06; (&#x1F4B0; {abbreviate(cost_level, 2)})</button>}
      </div>
    </li>
  );
}