const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const priceCache = new Map<string, number>();

export async function getBitcoinPriceAtDate(date: Date): Promise<number> {
  const dateKey = date.toISOString().split('T')[0];

  if (priceCache.has(dateKey)) {
    return priceCache.get(dateKey)!;
  }

  try {
    const [day, month, year] = [
      date.getDate().toString().padStart(2, '0'),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getFullYear(),
    ];

    const response = await fetch(
      `${COINGECKO_API}/coins/bitcoin/history?date=${day}-${month}-${year}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch Bitcoin price: ${response.statusText}`);
    }

    const data = await response.json();
    const price = data.market_data?.current_price?.usd;

    if (!price) {
      throw new Error('Price data not available for this date');
    }

    priceCache.set(dateKey, price);

    await new Promise(resolve => setTimeout(resolve, 1500));

    return price;
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error);
    throw error;
  }
}

export async function getCurrentBitcoinPrice(): Promise<number> {
  try {
    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=bitcoin&vs_currencies=usd`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch current Bitcoin price: ${response.statusText}`);
    }

    const data = await response.json();
    return data.bitcoin.usd;
  } catch (error) {
    console.error('Error fetching current Bitcoin price:', error);
    throw error;
  }
}
