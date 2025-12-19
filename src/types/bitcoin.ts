export interface BitcoinTransaction {
  hash: string;
  confirmed: Date;
  received: number;
  sent: number;
  balance: number;
  fees: number;
}

export interface AddressInfo {
  address: string;
  balance: number;
  totalReceived: number;
  totalSent: number;
  transactions: BitcoinTransaction[];
}

export interface TransactionWithPrice {
  hash: string;
  date: Date;
  btcAmount: number;
  usdValue: number;
  type: 'incoming' | 'outgoing';
  btcPrice: number;
}
