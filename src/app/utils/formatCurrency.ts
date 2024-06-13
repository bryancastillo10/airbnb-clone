const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "PHP",
  style: "currency",
});

export const formatCurrency = (price: number) => {
  return currencyFormatter.format(price);
};