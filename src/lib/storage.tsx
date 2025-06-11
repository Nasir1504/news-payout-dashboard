
const PAYOUT_KEY = 'payoutRate';

export const getPayoutRate = () => {
  if (typeof window !== 'undefined') {
    const rate = localStorage.getItem(PAYOUT_KEY);
    return rate ? parseFloat(rate) : 10;
  }
  return 10;
};

export const setPayoutRate = (rate: number) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PAYOUT_KEY, rate.toString());
  }
};
