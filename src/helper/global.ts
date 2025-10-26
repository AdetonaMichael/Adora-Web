export const formatMonetaryValue = (value: number | string) => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });
  return formatter.format(numericValue);
  };

export const capitalizeFirstLetter = (word:string) => word.charAt(0).toUpperCase() + word.slice(1);
