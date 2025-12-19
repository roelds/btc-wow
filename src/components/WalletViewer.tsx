import { useState } from 'react';
import { Search, Moon, Sun } from 'lucide-react';
import { AddressInfo, TransactionWithPrice } from '../types/bitcoin';
import { getAddressInfo } from '../services/blockchainApi';
import { getBitcoinPriceAtDate } from '../services/priceApi';
import { useTheme } from '../context/ThemeContext';
import WalletBalance from './WalletBalance';
import TransactionList from './TransactionList';

export default function WalletViewer() {
  const { theme, toggleTheme } = useTheme();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);
  const [transactions, setTransactions] = useState<TransactionWithPrice[]>([]);
  const [balanceAtLastTxRate, setBalanceAtLastTxRate] = useState<number | null>(null);

  const loadWalletData = async () => {
    if (!address.trim()) {
      setError('Please enter a Bitcoin address');
      return;
    }

    setLoading(true);
    setError('');
    setAddressInfo(null);
    setTransactions([]);
    setBalanceAtLastTxRate(null);

    try {
      const info = await getAddressInfo(address.trim());
      setAddressInfo(info);

      if (info.transactions.length === 0) {
        setLoading(false);
        return;
      }

      const txsWithPrices: TransactionWithPrice[] = [];

      for (const tx of info.transactions) {
        try {
          const price = await getBitcoinPriceAtDate(tx.confirmed);
          const netAmount = tx.received - tx.sent;

          txsWithPrices.push({
            hash: tx.hash,
            date: tx.confirmed,
            btcAmount: Math.abs(netAmount),
            usdValue: Math.abs(netAmount) * price,
            type: netAmount > 0 ? 'incoming' : 'outgoing',
            btcPrice: price,
          });
        } catch (priceError) {
          console.error(`Failed to fetch price for transaction ${tx.hash}:`, priceError);
        }
      }

      setTransactions(txsWithPrices);

      if (txsWithPrices.length > 0 && info.balance > 0) {
        const lastTxPrice = txsWithPrices[0].btcPrice;
        setBalanceAtLastTxRate(info.balance * lastTxPrice);
      }

      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load wallet data');
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadWalletData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 sm:mb-8">
          <div className="text-center sm:text-left flex-1 w-full">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
              BTC WOW Fiat Tracker
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Track BTC balance with historical fiat price (limit 55 recent tx past year)
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-slate-900 dark:text-slate-50 flex-shrink-0"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter BTC address (e.g., 1111111111111111111114oLvT2)"
              className="flex-1 px-4 py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-500 dark:placeholder-slate-400"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 sm:px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-sm sm:text-base rounded-lg disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 flex-shrink-0"
            >
              <Search size={20} />
              <span className="hidden sm:inline">{loading ? 'Loading...' : 'Search'}</span>
              <span className="sm:hidden">{loading ? '...' : 'Go'}</span>
            </button>
          </div>
        </form>

        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-lg text-red-700 dark:text-red-200">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Loading wallet data and fetching historical prices...
            </p>
          </div>
        )}

        {addressInfo && !loading && (
          <div className="space-y-6">
            <WalletBalance
              address={addressInfo.address}
              balance={addressInfo.balance}
              balanceAtLastTxRate={balanceAtLastTxRate}
              lastTransactionDate={
                addressInfo.transactions.length > 0
                  ? addressInfo.transactions[0].confirmed
                  : null
              }
            />

            {transactions.length > 0 && (
              <TransactionList transactions={transactions} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
