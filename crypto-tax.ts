export interface Transaction {
  date: string;
  type: string;
  asset: string;
  amount: number;
  price: number;
  value: number;
  fee: number;
}

export interface TaxReport {
  totalTransactions: number;
  totalCapitalGains: string;
  taxYear: string;
  estimatedTax: string;
  aiExplanation: string[];
  transactions: Transaction[];
}

export interface TaxCsvRow {
  Date: string;
  Type: string;
  Asset: string;
  Amount: number;
  Price: number;
  Fee?: number;
  Notes?: string;
}

export async function parseCsvToJson(csvString: string): Promise<TaxCsvRow[]> {
  const lines = csvString.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(value => value.trim());
    const row: any = {};
    
    headers.forEach((header, i) => {
      // Convert numeric values
      if (['Amount', 'Price', 'Fee'].includes(header)) {
        row[header] = parseFloat(values[i]) || 0;
      } else {
        row[header] = values[i];
      }
    });
    
    return row as TaxCsvRow;
  });
}

export function calculateTaxableGains(
  transactions: TaxCsvRow[],
  countryCode: string
): {
  totalGains: number;
  taxableAmount: number;
  transactions: Transaction[];
} {
  // Convert to our internal transaction format
  const processedTransactions: Transaction[] = transactions.map(tx => ({
    date: tx.Date,
    type: tx.Type,
    asset: tx.Asset,
    amount: tx.Amount,
    price: tx.Price,
    value: tx.Amount * tx.Price,
    fee: tx.Fee || 0
  }));
  
  // Sort transactions by date
  processedTransactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Calculate gains - simplified logic for demo
  // In a real implementation, this would implement country-specific tax rules
  let totalGains = 0;
  let taxableAmount = 0;
  
  // Implementation varies by country
  switch (countryCode) {
    case 'us':
      // US uses FIFO (First In, First Out)
      totalGains = calculateFIFO(processedTransactions);
      taxableAmount = totalGains * 0.15; // Simplified rate
      break;
    case 'uk':
      // UK has an annual exemption
      totalGains = calculateFIFO(processedTransactions);
      taxableAmount = Math.max(0, totalGains - 12300) * 0.20; // Simplified with £12,300 exemption
      break;
    case 'in':
      // India taxes crypto gains at 30%
      totalGains = calculateFIFO(processedTransactions);
      taxableAmount = totalGains * 0.30;
      break;
    case 'de':
      // Germany exempts crypto held > 1 year
      totalGains = calculateWithHoldingPeriod(processedTransactions, 365);
      taxableAmount = totalGains * 0.25;
      break;
    case 'ca':
      // Canada taxes 50% of capital gains
      totalGains = calculateFIFO(processedTransactions);
      taxableAmount = totalGains * 0.5 * 0.26; // 50% taxable at 26% avg rate
      break;
    case 'au':
      // Australia has CGT discount for assets held > 1 year
      totalGains = calculateWithHoldingPeriod(processedTransactions, 365);
      taxableAmount = totalGains * 0.325; // Simplified
      break;
    case 'jp':
      // Japan has a flat 20% tax rate on gains
      totalGains = calculateFIFO(processedTransactions);
      taxableAmount = totalGains * 0.20;
      break;
    default:
      // Default FIFO calculation
      totalGains = calculateFIFO(processedTransactions);
      taxableAmount = totalGains * 0.15;
  }
  
  return {
    totalGains,
    taxableAmount,
    transactions: processedTransactions
  };
}

// First In, First Out calculation method
function calculateFIFO(transactions: Transaction[]): number {
  let totalGains = 0;
  const holdings: {[asset: string]: {amount: number, costBasis: number}[]} = {};
  
  transactions.forEach(tx => {
    if (tx.type.toLowerCase() === 'buy') {
      // Add to holdings
      if (!holdings[tx.asset]) {
        holdings[tx.asset] = [];
      }
      
      holdings[tx.asset].push({
        amount: tx.amount,
        costBasis: tx.price
      });
    } else if (tx.type.toLowerCase() === 'sell') {
      if (!holdings[tx.asset] || holdings[tx.asset].length === 0) {
        // Selling what we don't have - should handle this error in production
        return;
      }
      
      let remainingToSell = tx.amount;
      let proceedsFromSale = tx.amount * tx.price;
      let costBasisTotal = 0;
      
      // Process the sale using FIFO
      while (remainingToSell > 0 && holdings[tx.asset].length > 0) {
        const oldest = holdings[tx.asset][0];
        
        if (oldest.amount <= remainingToSell) {
          // Use the entire lot
          costBasisTotal += oldest.amount * oldest.costBasis;
          remainingToSell -= oldest.amount;
          holdings[tx.asset].shift();
        } else {
          // Use part of the lot
          costBasisTotal += remainingToSell * oldest.costBasis;
          oldest.amount -= remainingToSell;
          remainingToSell = 0;
        }
      }
      
      // Calculate gain/loss
      const gainLoss = proceedsFromSale - costBasisTotal - tx.fee;
      totalGains += gainLoss;
    }
  });
  
  return totalGains;
}

// Calculate based on holding period (for countries with preferential long-term rates)
function calculateWithHoldingPeriod(transactions: Transaction[], daysThreshold: number): number {
  // Group transactions by asset
  const txByAsset: {[asset: string]: Transaction[]} = {};
  
  transactions.forEach(tx => {
    if (!txByAsset[tx.asset]) {
      txByAsset[tx.asset] = [];
    }
    txByAsset[tx.asset].push(tx);
  });
  
  let totalGains = 0;
  
  // Process each asset
  Object.keys(txByAsset).forEach(asset => {
    const assetTxs = txByAsset[asset].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const buys: Transaction[] = assetTxs.filter(tx => tx.type.toLowerCase() === 'buy');
    const sells: Transaction[] = assetTxs.filter(tx => tx.type.toLowerCase() === 'sell');
    
    // Process each sell
    sells.forEach(sell => {
      const sellDate = new Date(sell.date);
      let remainingToSell = sell.amount;
      let proceedsFromSale = sell.amount * sell.price;
      let costBasisTotal = 0;
      
      // Match with buys using FIFO and check holding period
      for (let i = 0; i < buys.length && remainingToSell > 0; i++) {
        const buy = buys[i];
        if (buy.amount <= 0) continue;
        
        const buyDate = new Date(buy.date);
        const holdingPeriodDays = (sellDate.getTime() - buyDate.getTime()) / (1000 * 60 * 60 * 24);
        
        // Calculate how much to use from this buy
        const amountToUse = Math.min(remainingToSell, buy.amount);
        
        // Apply different tax treatment based on holding period
        if (holdingPeriodDays > daysThreshold) {
          // Long-term holding - in some countries this might be exempt or taxed at a lower rate
          costBasisTotal += amountToUse * buy.price * 0.5; // Example: 50% discount
        } else {
          // Short-term holding - normal taxation
          costBasisTotal += amountToUse * buy.price;
        }
        
        // Update the remaining amounts
        remainingToSell -= amountToUse;
        buy.amount -= amountToUse;
      }
      
      // Calculate gain/loss
      const gainLoss = proceedsFromSale - costBasisTotal - sell.fee;
      totalGains += gainLoss;
    });
  });
  
  return totalGains;
}
