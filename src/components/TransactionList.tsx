import { ArrowDownLeft, ArrowUpRight, ExternalLink, TrendingUp } from 'lucide-react';
import { TransactionWithPrice } from '../types/bitcoin';
import { getBitcoinChartUrl } from '../utils/chartLinks';

interface TransactionListProps {
  transactions: TransactionWithPrice[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 sm:p-6 border border-slate-200 dark:border-slate-700 transition-colors">
      <div className="flex items-baseline gap-2 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-50">
          Transaction History
        </h2>
        <span className="text-sm text-slate-600 dark:text-slate-400">
          ({transactions.length})
        </span>
      </div>
      <div className="space-y-3">
        {transactions.map((tx, index) => (
          <div
            key={tx.hash}
            className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 sm:p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 w-6 text-center">
                    {index + 1}
                  </span>
                  <div
                    className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                      tx.type === 'incoming'
                        ? 'bg-green-100 dark:bg-green-900'
                        : 'bg-orange-100 dark:bg-orange-900'
                    }`}
                  >
                  {tx.type === 'incoming' ? (
                    <ArrowDownLeft
                      className="text-green-600 dark:text-green-400"
                      size={20}
                    />
                  ) : (
                    <ArrowUpRight
                      className="text-orange-600 dark:text-orange-400"
                      size={20}
                    />
                  )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        tx.type === 'incoming'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-orange-600 dark:text-orange-400'
                      }`}
                    >
                      {tx.type === 'incoming' ? 'Received' : 'Sent'}
                    </span>
                    <div className="flex gap-1">
                      <a
                        href={`https://blockchair.com/bitcoin/transaction/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        title="View transaction on blockchaiR explorer"
                      >
                        <ExternalLink size={14} />
                      </a>
                      <a
                        href={`https://blockstream.info/tx/${tx.hash}?expand`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        title="View transaction on blockstream explorer"
                      >
                        <ExternalLink size={14} />
                      </a>
                      <a
                        href={`https://www.blockchain.com/explorer/transactions/btc/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        title="View transaction on blockchaiN explorer"
                      >
                        <ExternalLink size={14} />
                      </a>
                      <a
                        href={getBitcoinChartUrl(tx.date)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                        title="View BTC price chart for this date"
                      >
                        <TrendingUp size={14} />
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate mb-1 sm:mb-2">
                    {tx.hash}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {tx.date.toLocaleString('en-US', { timeZone: 'UTC' })}
                  </p>
                </div>
              </div>

              <div className="text-right flex-shrink-0 pt-2 sm:pt-0">
                <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-50">
                  {tx.btcAmount.toFixed(8)} BTC
                </p>
                <p className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">
                  ${tx.usdValue.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  @ ${tx.btcPrice.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}/BTC
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
