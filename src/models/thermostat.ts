export default function thermostatModel(actual: number, target: number) {
  return actual < target;
}

export const overheatThreshold = 40;
