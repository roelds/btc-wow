import { AddressInfo, BitcoinTransaction } from '../types/bitcoin';

const BLOCKCYPHER_API = 'https://api.blockcypher.com/v1/btc/main';

export async function getAddressInfo(address: string): Promise<AddressInfo> {
  try {
    const response = await fetch(`${BLOCKCYPHER_API}/addrs/${address}/full?limit=55`);

    if (!response.ok) {
      throw new Error(`Failed to fetch address data: ${response.statusText}`);
    }

    const data = await response.json();

    const transactions: BitcoinTransaction[] = (data.txs || []).map((tx: any) => {
      const isReceived = tx.outputs.some((output: any) =>
        output.addresses && output.addresses.includes(address)
      );

      const received = tx.outputs
        .filter((output: any) => output.addresses && output.addresses.includes(address))
        .reduce((sum: number, output: any) => sum + output.value, 0);

      const sent = tx.inputs
        .filter((input: any) => input.addresses && input.addresses.includes(address))
        .reduce((sum: number, input: any) => sum + input.output_value, 0);

      return {
        hash: tx.hash,
        confirmed: new Date(tx.confirmed || tx.received),
        received: received / 100000000,
        sent: sent / 100000000,
        balance: (received - sent) / 100000000,
        fees: tx.fees / 100000000,
      };
    });

    transactions.sort((a, b) => b.confirmed.getTime() - a.confirmed.getTime());

    return {
      address: data.address,
      balance: data.final_balance / 100000000,
      totalReceived: data.total_received / 100000000,
      totalSent: data.total_sent / 100000000,
      transactions,
    };
  } catch (error) {
    console.error('Error fetching address info:', error);
    throw error;
  }
}
