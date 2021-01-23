import { gql } from "@apollo/client";

export const GATHER_WOOD_MUTATION = gql`
  mutation GatherWood {
    gatherWood {
      id
      lumberjack
      wood
      level
    }
  }
`;

export const SELL_WOOD_MUTATION = gql`
  mutation SellWood {
    sellWood {
      id
      balance
      lumberyard {
        id
        wood
      }
    }
  }
`;

export const BUY_LUMBERJACK_MUTATION = gql`
  mutation BuyLumberjack($input: BuyLumberjackInput!) {
    buyLumberjack(input: $input) {
      id
      lumberjack
      cost_1
      cost_10
      cost_100
    }
  }
`;

export const UPGRADE_LUMBERYARD_MUTATION = gql`
  mutation UpgradeLumberyard {
    upgradeLumberyard {
      id
      level
      cost_level
      level_multiplier
    }
  }
`;

export const GATHER_STONE_MUTATION = gql`
  mutation GatherStone {
    gatherStone {
      id
      miner
      stone
      level
    }
  }
`;

export const SELL_STONE_MUTATION = gql`
  mutation SellStone {
    sellStone {
      id
      balance
      mine {
        id
        stone
      }
    }
  }
`;

export const BUY_MINER_MUTATION = gql`
  mutation BuyMiner($input: BuyMinerInput!) {
    buyMiner(input: $input) {
      id
      miner
      cost_1
      cost_10
      cost_100
    }
  }
`;

export const UPGRADE_MINE_MUTATION = gql`
  mutation UpgradeMine {
    upgradeMine {
      id
      level
      cost_level
      level_multiplier
    }
  }
`;

export const GATHER_IRON_MUTATION = gql`
  mutation GatherIron {
    gatherIron {
      id
      blacksmith
      iron
      level
    }
  }
`;

export const SELL_IRON_MUTATION = gql`
  mutation SellIron {
    sellIron {
      id
      balance
      smithy {
        id
        iron
      }
    }
  }
`;

export const BUY_BLACKSMITH_MUTATION = gql`
  mutation BuyBlacksmith($input: BuyBlacksmithInput!) {
    buyBlacksmith(input: $input) {
      id
      blacksmith
      cost_1
      cost_10
      cost_100
    }
  }
`;

export const UPGRADE_SMITHY_MUTATION = gql`
  mutation UpgradeSmithy {
    upgradeSmithy {
      id
      level
      cost_level
      level_multiplier
    }
  }
`;