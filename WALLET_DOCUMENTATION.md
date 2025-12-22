# Bitcoin Watch-Only Wallet - Documentation

## Overview

This application provides a Bitcoin watch-only wallet viewer with historical fiat value tracking. It allows users to view Bitcoin balances and transaction history with USD values calculated using exchange rates from when each transaction occurred.

## Features

### 1. Balance Display with Historical Fiat Value
- Shows current Bitcoin balance for any valid address
- Displays the fiat value (USD) of the current balance using the exchange rate from the most recent transaction
- Clearly labeled as "Balance at Last Transaction Rate"

### 2. Transaction History with Historical Fiat Values
- Lists all transactions for the wallet address
- For each transaction displays:
  - Transaction hash (clickable link to blockchain explorer)
  - Date and time
  - Bitcoin amount (sent/received)
  - Fiat value (USD) using the historical exchange rate from that specific transaction date
  - Transaction type (incoming/outgoing) with visual indicators
  - The BTC/USD exchange rate used for the calculation

## How to Use

### Running the Application

1. The development server starts automatically
2. Open your browser (the URL will be provided)
3. Enter a Bitcoin address in the search field
4. Click "Search" or press Enter

### Example Address for Testing

Test address: `1111111111111111111114oLvT2`

This is a known burn address with transaction history, perfect for testing the application.

### Understanding the Display

**Balance Section:**
- "Current Balance" - The actual Bitcoin balance in the wallet
- "Balance at Last Transaction Rate" - The USD value of the balance calculated using the exchange rate from the most recent transaction date

**Transaction List:**
- Green icon with down-left arrow = Incoming transaction (received)
- Orange icon with up-right arrow = Outgoing transaction (sent)
- Each transaction shows:
  - BTC amount (8 decimal places)
  - USD value at the time of transaction
  - The exchange rate used (shown as "@ $X.XX/BTC")

## Technical Implementation

### APIs Used

**BlockCypher API**
- Purpose: Fetch Bitcoin blockchain data (addresses, transactions, balances)
- Endpoint: `https://api.blockcypher.com/v1/btc/main`
- Rate Limit: Free tier allows reasonable usage for testing
- No API key required for basic usage

**CoinGecko API**
- Purpose: Fetch historical Bitcoin prices
- Endpoint: `https://api.coingecko.com/api/v3`
- Rate Limit: 10-40 calls/minute on free tier
- The app includes a 1.5-second delay between price requests to respect rate limits

### Historical Price Calculation

The application matches each transaction with the Bitcoin price on that specific date:

1. For each transaction, extract the confirmation date
2. Query CoinGecko for the Bitcoin price on that date
3. Calculate USD value: `BTC amount × BTC price on transaction date`
4. Cache prices to avoid redundant API calls

### Error Handling

The application handles several error scenarios:
- Invalid Bitcoin addresses
- Network failures
- API rate limiting
- Missing price data for very old transactions
- Empty wallets (no transactions)

## Assumptions and Limitations

### Assumptions
1. **Daily Price Granularity**: Historical prices are fetched at daily granularity (one price per day), not intraday prices
2. **USD Only**: Only USD fiat values are displayed (other currencies could be added)
3. **Transaction Limit**: Shows up to 55 most recent transactions (can be adjusted in the code)
4. **Price Availability**: Assumes CoinGecko has price data for the transaction dates (Bitcoin prices available from ~2013 onwards)

### Limitations
1. **Rate Limiting**:
   - CoinGecko free tier has rate limits
   - The app includes delays between requests but may still hit limits with many transactions
   - Consider upgrading to paid API tier for production use

2. **Price Accuracy**:
   - Historical prices represent daily closing prices or snapshots
   - Actual transaction prices may vary if multiple BTC exchanges had different rates
   - Does not account for the exact moment within the day when the transaction occurred

3. **Very Old Transactions**:
   - Price data may not be available for very early Bitcoin transactions (pre-2013)
   - In such cases, the transaction will be shown without a USD value

4. **No Mempool Support**:
   - Only confirmed transactions are shown
   - Unconfirmed transactions are not displayed

## Testing Results

### Test Address: 1111111111111111111114oLvT2

This is a Bitcoin burn address (provably unspendable) that has received numerous small transactions over the years, making it ideal for testing.

**Expected Results:**
- Shows current balance in BTC
- Displays balance value using the exchange rate from the most recent transaction
- Lists historical transactions with their respective USD values at the time they occurred
- Each transaction shows the exchange rate used for calculation

**Performance Notes:**
- Initial load may take 10-30 seconds depending on the number of transactions
- This is due to fetching historical prices for each transaction
- Subsequent searches use cached price data for better performance

## Code Structure

```
src/
├── components/
│   ├── WalletViewer.tsx       # Main component with search and data loading
│   ├── WalletBalance.tsx      # Balance display component
│   └── TransactionList.tsx    # Transaction history display
├── services/
│   ├── blockchainApi.ts       # BlockCypher API integration
│   └── priceApi.ts            # CoinGecko API integration
└── types/
    └── bitcoin.ts             # TypeScript type definitions
```

## Future Enhancements

Potential improvements for production use:
1. Add support for multiple currencies (EUR, GBP, etc.)
2. Implement backend caching to reduce API calls
3. Add pagination for addresses with many transactions
4. Include more detailed transaction information (fees, confirmations, etc.)
5. Add charts showing balance over time
6. Support for batch address lookup
7. Export transaction history to CSV/PDF
8. Real-time price updates with current market value comparison

## Security Notes

This is a **watch-only** wallet:
- No private keys are handled or stored
- Cannot send transactions
- Only displays public blockchain data
- Safe to use with any Bitcoin address

## Support and Issues

For any issues or questions:
1. Check that the Bitcoin address is valid
2. Verify internet connection (requires API access)
3. Wait a moment and retry if rate limits are hit
4. Check browser console for detailed error messages
