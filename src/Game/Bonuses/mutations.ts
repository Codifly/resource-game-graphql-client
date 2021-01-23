import { gql } from "@apollo/client";

export const BUY_BONUS_MUTATION = gql`
  mutation BuyBonus($input: BuyBonusInput!) {
    buyBonus(input: $input) {
      success
    }
  }
`;