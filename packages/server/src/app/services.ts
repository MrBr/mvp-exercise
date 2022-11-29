import { COINS } from "./constants";

export const getChange = (deposit: number) => {
  let remaining = deposit;
  return COINS.reverse()
    .reduce<number[]>((res, coin) => {
      const newRemaining = remaining % coin;
      const coins = (remaining - newRemaining) / coin;
      remaining = newRemaining;
      res.push(coins);
      return res;
    }, [])
    .reverse();
};
