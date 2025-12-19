export function getBitcoinChartUrl(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const formattedDate = `${day}-${month}-${year}`;

  return `https://www.barchart.com/crypto/quotes/%5EBTCUSD/technical-chart?plot=BAR&volume=total&data=I:15&density=L&pricesOn=1&asPctChange=0&logscale=1&im=15&startDate=${formattedDate}&endDate=${formattedDate}&daterange=specific&sym=%5EBTCUSD&grid=1&height=250&studyheight=100`;
}
