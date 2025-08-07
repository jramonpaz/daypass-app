export const formatToCurrency = (number: number, includeDecimals: boolean = false) => {
  if (typeof number !== 'number') {
    return number;
  }

  const hasDecimals = number % 1 !== 0 || includeDecimals;

  return number.toLocaleString('en-US', {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  });
};
