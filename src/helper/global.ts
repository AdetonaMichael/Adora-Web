export const formatMonetaryValue = (value: number) => {
    const formatter = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    });
    return formatter.format(value);
  };

 export const capitalizeFirstLetter = (word:string) => word.charAt(0).toUpperCase() + word.slice(1);
