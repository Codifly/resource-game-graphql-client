import { gql } from "@apollo/client";

export const USER_QUERY = gql`
query User {
  me {
    id
    username
    balance
    activeBonuses {
      activeUntil
      bonus {
        id
        type
        multiplier
        description
        target
      }
    }
    lumberyard {
      lumberjack
      wood
      level
      level_multiplier
      cost_1
      cost_10
      cost_100
      cost_level
    }
    mine {
      miner
      stone
      level
      level_multiplier
      cost_1
      cost_10
      cost_100
      cost_level
    }
    smithy {
      blacksmith
      iron
      level
      level_multiplier
      cost_1
      cost_10
      cost_100
      cost_level
    }
  }
}
`;