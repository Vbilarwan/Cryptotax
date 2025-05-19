export interface Country {
  code: string;
  name: string;
  flagUrl: string;
  taxInfo: string;
  currency: string;
  taxRules: {
    longTermThreshold?: number; // in days
    exemptionAmount?: number;
    taxRate: number;
    specialRules?: string[];
  };
}

export const countries: Country[] = [
  {
    code: 'us',
    name: 'United States',
    flagUrl: 'https://pixabay.com/get/gf53209baea109dbcc5e7696a13395a946f2958628ec0ea954f4c7ca20d7b3adc87fd1bb4b40a8ae228a6b46a5d00e8bb5bc4d961c24402a585f46e159aadb5b9_1280.jpg',
    taxInfo: 'In the United States, cryptocurrency is treated as property for tax purposes. This means you\'ll need to report capital gains and losses on each transaction, including crypto-to-crypto trades.',
    currency: 'USD',
    taxRules: {
      longTermThreshold: 365,
      taxRate: 0.15,
      specialRules: [
        'Crypto-to-crypto trades are taxable events',
        'Mining income is taxable as ordinary income',
        'FIFO (First In, First Out) is the common accounting method'
      ]
    }
  },
  {
    code: 'uk',
    name: 'United Kingdom',
    flagUrl: 'https://images.unsplash.com/photo-1589994160839-163cd867cfe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=60',
    taxInfo: 'The UK treats cryptocurrency as an asset subject to Capital Gains Tax. There\'s an annual tax-free allowance of £12,300, with gains above this amount taxed at 10% or 20% depending on your income tax band.',
    currency: 'GBP',
    taxRules: {
      exemptionAmount: 12300,
      taxRate: 0.20,
      specialRules: [
        'Annual tax-free allowance of £12,300',
        'Crypto mining is considered miscellaneous income',
        'Share pooling accounting method is required'
      ]
    }
  },
  {
    code: 'in',
    name: 'India',
    flagUrl: 'https://pixabay.com/get/gb3824af1ef7f5d5ba380343a2892879ec4aa9805318efbc04798b34422d256f61ca2664913c6f7b53b6e7298129aa49462728875cfc5bac3709f844b9f4181ee_1280.jpg',
    taxInfo: 'India applies a flat 30% tax on crypto income with no deductions for losses. Additionally, a 1% TDS (Tax Deducted at Source) applies to crypto transfers above certain thresholds.',
    currency: 'INR',
    taxRules: {
      taxRate: 0.30,
      specialRules: [
        '1% TDS on transfers above certain thresholds',
        'No offsetting of losses against other income',
        'No distinction between long-term and short-term gains'
      ]
    }
  },
  {
    code: 'de',
    name: 'Germany',
    flagUrl: 'https://pixabay.com/get/g17ff8bb41c195f8b11bb8175441a857e8c8b1e94fcc7bff04d3db9662252669f472d3ed13103ce444b036e211f20c05093ecea64388bfd8f9c9001646cfe6489_1280.jpg',
    taxInfo: 'Germany exempts cryptocurrency gains if held for more than one year. Short-term gains under €600 per year are also tax-free. Above this threshold, gains are taxed at your personal income tax rate.',
    currency: 'EUR',
    taxRules: {
      longTermThreshold: 365,
      exemptionAmount: 600,
      taxRate: 0.25,
      specialRules: [
        'Tax exemption for crypto held over 1 year',
        'Small gains exemption of €600 annually',
        'Mining taxed as commercial income'
      ]
    }
  },
  {
    code: 'ca',
    name: 'Canada',
    flagUrl: 'https://pixabay.com/get/g6b97173601d7cee14ff935a89dbdff5079b37b1e659c1693b78e237f6a952ca2629cea673f6acb91946080d5bdeaa687dda4e94cd288c49cd54b87b40124e755_1280.jpg',
    taxInfo: 'In Canada, cryptocurrency is treated either as capital gains (50% taxable) or as business income (100% taxable) depending on your activities. The CRA determines this based on factors like frequency of trading.',
    currency: 'CAD',
    taxRules: {
      taxRate: 0.5, // 50% inclusion rate
      specialRules: [
        'Only 50% of capital gains are taxable',
        'High-frequency trading may be classified as business income',
        'ACB (Adjusted Cost Basis) is the required calculation method'
      ]
    }
  },
  {
    code: 'au',
    name: 'Australia',
    flagUrl: 'https://pixabay.com/get/ge3c0d4c1fad2006e911b0d5a850acf6e6fcaa4fda19b7b3d1692baa2ba731f585676138e24f405e59b310c0935c345166be01f9d2bb18d9a11ff03db97cba411_1280.jpg',
    taxInfo: 'Australia taxes crypto as a capital gains event. If held for more than 12 months, individuals can receive a 50% CGT discount. Personal use assets under AUD $10,000 may be exempt.',
    currency: 'AUD',
    taxRules: {
      longTermThreshold: 365,
      taxRate: 0.325, // Effective with CGT discount
      specialRules: [
        '50% CGT discount for assets held over 12 months',
        'Personal use exemption for assets under AUD $10,000',
        'Record keeping requirements are very strict'
      ]
    }
  },
  {
    code: 'jp',
    name: 'Japan',
    flagUrl: 'https://pixabay.com/get/gadf7aeab0574ebd98c3a7d96844a8d12cda9b9dc9d0a28224cf6bbc8656c933d86d4f30026f2d5fb163ec5279e94238db4486ad15e0d9101fbdd7700bf248bd7_1280.jpg',
    taxInfo: 'Japan taxes crypto profits as "miscellaneous income" with progressive rates from 15% to 55%. Annual tax-free allowance is JPY 200,000 for total miscellaneous income.',
    currency: 'JPY',
    taxRules: {
      exemptionAmount: 200000,
      taxRate: 0.20, // Simplified rate
      specialRules: [
        'Progressive tax rates from 15% to 55%',
        'Annual tax-free allowance of JPY 200,000',
        'Detailed reporting requirements for all crypto assets'
      ]
    }
  }
];

export function getCountryByCode(code: string): Country | undefined {
  return countries.find(country => country.code === code);
}
