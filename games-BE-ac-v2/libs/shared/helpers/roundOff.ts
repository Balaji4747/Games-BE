export const truncateToTwoDecimals = (number: number) => {
  return Math.trunc(number * 100) / 100;
};
