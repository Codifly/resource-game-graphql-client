import React, { useCallback, useEffect } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { USER_QUERY } from '../../queries';
import { USER_SUBSCRIPTION } from '../../subscriptions';
import { BUY_LUMBERJACK_MUTATION, GATHER_WOOD_MUTATION, SELL_WOOD_MUTATION, UPGRADE_LUMBERYARD_MUTATION } from '../mutations';
import abbreviate from '@pqt/abbreviate';

export default function Lumberyard() {
  return null;

  // const { data: queryData, loading: queryLoading, error: queryError } = useQuery(USER_QUERY);
  // const { data: subData, error: subError } = useSubscription(USER_SUBSCRIPTION);

  // let user = subData?.userLive || queryData?.me;

  // const [gatherWood] = useMutation(GATHER_WOOD_MUTATION);
  // const [buyLumberjack] = useMutation(BUY_LUMBERJACK_MUTATION);
  // const [upgradeLumberyard] = useMutation(UPGRADE_LUMBERYARD_MUTATION);
  // const [sellWood] = useMutation(SELL_WOOD_MUTATION);

  // const upgrade = useCallback(() => {
  //   upgradeLumberyard().catch(err => {
  //     console.log(err);
  //   });
  // }, [upgradeLumberyard]);

  // const gather = useCallback(() => {
  //   gatherWood().catch(err => {
  //     console.log(err);
  //   });
  // }, [gatherWood]);

  // const sell = useCallback(() => {
  //   sellWood().catch(err => {
  //     console.log(err);
  //   });
  // }, [sellWood]);

  // const buy = useCallback((amount) => {
  //   return () => {
  //     buyLumberjack({
  //       variables: {
  //         input: {
  //           amount,
  //         },
  //       },
  //     }).catch(err => {
  //       console.log(err);
  //     });
  //   }
  // }, [buyLumberjack]);

  // useEffect(() => {
  //   gather();
  //   const intervalId = setInterval(gather, 10100);

  //   return () => {
  //     clearInterval(intervalId);
  //   }
  // }, []);

  // if (queryLoading) {
  //   return (
  //     <li>
  //       <p className="title darkgreen-text">Lumberyard</p>
  //       <p>Loading...</p>
  //     </li>
  //   );
  // }
  
  // if (queryError || subError) {
  //   return (
  //     <li>
  //       <p className="title darkgreen-text">Lumberyard</p>
  //       <p className="red-text">Could not {subError ? 'update' : 'fetch'} your user</p>
  //     </li>
  //   );
  // }

  // const { lumberyard: { lumberjack, wood, level, cost_1, cost_10, cost_100, cost_level, level_multiplier }, balance } = user;

  // return (
  //   <li>
  //     <p className="darkgreen-text">Lumberyard [Lvl {level} (x{level_multiplier})]</p>
  //     <p>Lumberjacks: &#x1FA93; {lumberjack}</p>
  //     <p>Wood: &#x1F332; {wood}</p>
  //     <div className="row gap">
  //       {/* <button onClick={buy(1)} disabled={balance < cost_1}>buy 1 (&#x1F4B0; {abbreviate(cost_1, 2)})</button> */}
  //       {/* <button onClick={buy(10)} disabled={balance < cost_10}>buy 10 (&#x1F4B0; {abbreviate(cost_10, 2)})</button> */}
  //       {/* <button onClick={buy(100)} disabled={balance < cost_100}>buy 100 (&#x1F4B0; {abbreviate(cost_100, 2)})</button> */}
  //       {/* <button onClick={sell} disabled={wood === 0} className="green">Sell all &#x1F332; (&#x1F4B0; {abbreviate(wood * 1, 2)})</button> */}
  //       {/* {level < 5 && <button onClick={upgrade} className="yellow" disabled={balance < cost_level}>Level up &#x2B06; (&#x1F4B0; {abbreviate(cost_level, 2)})</button>} */}
  //     </div>
  //   </li>
  // );
}