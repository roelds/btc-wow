import { Wallet, ExternalLink } from 'lucide-react';

interface WalletBalanceProps {
  address: string;
  balance: number;
  balanceAtLastTxRate: number | null;
  lastTransactionDate: Date | null;
}

export default function WalletBalance({
  address,
  balance,
  balanceAtLastTxRate,
  lastTransactionDate,
}: WalletBalanceProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 sm:p-6 border border-slate-200 dark:border-slate-700 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg transition-colors flex-shrink-0">
          <Wallet className="text-blue-600 dark:text-blue-400" size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">Wallet Balance</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono break-all">{address}</p>
            <div className="flex gap-1 flex-shrink-0">
              <a
                href={`https://blockchair.com/bitcoin/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="View address on BlockchaiR"
              >
                <ExternalLink size={14} />
              </a>
              <a
                href={`https://blockstream.info/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="View address on BlockStream"
              >
                <ExternalLink size={14} />
              </a>
              <a
                href={`https://www.blockchain.com/explorer/addresses/BTC/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="View address on BlockchaiN"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Current Balance</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            {balance.toFixed(8)} BTC
          </p>
        </div>

        {balanceAtLastTxRate !== null && lastTransactionDate && (
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              Balance at Last Transaction Rate
            </p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              ${balanceAtLastTxRate.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Based on rate from {lastTransactionDate.toLocaleDateString('en-US', { timeZone: 'UTC' })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
