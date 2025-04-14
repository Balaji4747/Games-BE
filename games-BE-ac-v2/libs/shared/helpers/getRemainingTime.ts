export const getRemainingTime = (endTime: number): number => {
  const now = Date.now();
  const remainingTime = endTime - now;
  return Math.max(remainingTime, 0);
};
