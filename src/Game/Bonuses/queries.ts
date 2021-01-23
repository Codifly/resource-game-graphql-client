import { gql } from "@apollo/client";

export const AVAILABLE_BONUSES_QUERY = gql`
  query AvailableBonuses {
    availableBonuses {
      id
      type
      availableUntil
      level
      cost
      duration
      target
      multiplier
      description
    }
  }
`;