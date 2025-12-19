# Bitcoin Watch-Only Wallet

A Bitcoin watch-only wallet viewer with historical fiat value tracking capabilities.

## Quick Start

The development server starts automatically. Simply open the application in your browser and enter a Bitcoin address to view its balance and transaction history with historical USD values.

### Test Address

Try this address to see the app in action:
```
1111111111111111111114oLvT2
```

## Key Features

- View Bitcoin balance for any address
- See balance value using exchange rate from last transaction
- Complete transaction history with historical USD values
- Each transaction shows the BTC/USD rate from that date
- Clean, modern UI with real-time loading states

## How It Works

1. Enter any Bitcoin address in the search field
2. Application fetches transaction data from BlockCypher API
3. For each transaction, retrieves the Bitcoin price from that specific date using CoinGecko API
4. Displays all transactions with their historical USD values
5. Shows current balance with USD value based on the most recent transaction's exchange rate

## Technical Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Blockchain Data**: BlockCypher API
- **Price Data**: CoinGecko API
- **Icons**: Lucide React

## Documentation

See [WALLET_DOCUMENTATION.md](./WALLET_DOCUMENTATION.md) for complete documentation including:
- Detailed feature descriptions
- API integration details
- Historical price calculation methodology
- Testing results
- Assumptions and limitations
- Code structure
- Future enhancement ideas

## Notes

- This is a **watch-only** wallet - no private keys, completely safe
- Rate limiting applies to free API tiers - includes automatic delays
- Historical prices use daily granularity
- Shows up to 50 most recent transactions per address
- Price data available from ~2013 onwards

## Build

```bash
npm run build
```

Production build completed successfully and verified.
