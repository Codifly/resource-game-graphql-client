import { gql } from "@apollo/client";

export const AVAILABLE_BONUSES_SUBSCRIPTION = gql`
subscription AvailableBonusesLive {
  availableBonusesLive {
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