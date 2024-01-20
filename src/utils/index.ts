export function formatCurrency(currency: string, amount: number) {
  try {
    const formattedCurrency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);

    return formattedCurrency;
  } catch (error) {
    // Handle any errors that might occur during formatting
    console.error('Error formatting currency:', error);
    return 'N/A';
  }
}
