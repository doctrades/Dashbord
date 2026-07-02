// ═══════════════════════════════════════════════════════════
//  ACCOUNTS.JS  —  Edit this file to manage your accounts
// ═══════════════════════════════════════════════════════════

// const ACCOUNTS = [
//   {
//     id: 'BG-10K-001',
//     accountName: 'Blue Guardian $10K',
//     propFirm: 'Blue Guardian',
//     accountSize: 10000,
//     initialBalance: 10000,
//     currentBalance: 10099.73,
//     targetBalance: 10300,       // phase profit target
//     maxDrawdown: 500,           // max allowed drawdown ($)
//     phase: 'PHASE 1',
//     totalPhases: 3,
//     startDate: '2026-06-01',
//     accountNumber: '6A1C1C11',
//     dashboardUrl: 'https://trader.blueguardian.com/metrics/6a1c1c1113978daeb5c1b489',
//     status: 'active',           // active | passed | failed | funded
//     style: 'blue',
//     note: 'Trending well, 1 trading day completed.',
//   },
//   {
//     id: 'FTMO-25K-001',
//     accountName: 'GFT $25K',
//     propFirm: 'FTMO',
//     accountSize: 25000,
//     initialBalance: 25000,
//     currentBalance: 25340.00,
//     targetBalance: 27500,
//     maxDrawdown: 1250,
//     phase: 'PHASE 2',
//     totalPhases: 2,
//     startDate: '2026-05-15',
//     accountNumber: 'FTMO-884412',
//     dashboardUrl: '#',
//     status: 'active',
//     style: 'gold',
//     note: 'Phase 1 passed. Now in verification.',
//   },
//   {
//     id: 'MFF-50K-001',
//     accountName: 'My Forex Funds $50K',
//     propFirm: 'My Forex Funds',
//     accountSize: 50000,
//     initialBalance: 50000,
//     currentBalance: 48750.00,
//     targetBalance: 53000,
//     maxDrawdown: 2500,
//     phase: 'PHASE 1',
//     totalPhases: 2,
//     startDate: '2026-05-01',
//     accountNumber: 'MFF-220891',
//     dashboardUrl: '#',
//     status: 'active',
//     style: 'purple',
//     note: 'Slight drawdown after bad week. Be cautious.',
//   },
//   {
//     id: 'E8-100K-001',
//     accountName: 'E8 Funding $100K',
//     propFirm: 'E8 Funding',
//     accountSize: 100000,
//     initialBalance: 100000,
//     currentBalance: 100000,
//     targetBalance: 108000,
//     maxDrawdown: 8000,
//     phase: 'PHASE 1',
//     totalPhases: 2,
//     startDate: '2026-06-20',
//     accountNumber: 'E8-774023',
//     dashboardUrl: '#',
//     status: 'active',
//     style: 'green',
//     note: 'Just started. No trades yet.',
//   },
//   {
//     id: 'FTMO-10K-FAIL',
//     accountName: 'FTMO $10K (Attempt 1)',
//     propFirm: 'FTMO',
//     accountSize: 10000,
//     initialBalance: 10000,
//     currentBalance: 9400.00,
//     targetBalance: 11000,
//     maxDrawdown: 500,
//     phase: 'PHASE 1',
//     totalPhases: 2,
//     startDate: '2026-04-01',
//     accountNumber: 'FTMO-771203',
//     dashboardUrl: '#',
//     status: 'failed',
//     style: 'red',
//     note: 'Hit max daily loss. Lesson learned.',
//   },
// ];


const ACCOUNTS = [
  {
    id: 'BG-10K-001',
    accountName: 'Blue Guardian $10K',
    propFirm: 'Blue Guardian',
    accountSize: 10000,
    initialBalance: 10000,
    currentBalance: 10465.48,
    targetBalance: 10600,       // phase profit target
    maxDrawdown: 800,           // max allowed drawdown ($)
    phase: 'PHASE 3',
    totalPhases: 3,
    startDate: '2026-06-26',
    accountNumber: '242919',
    dashboardUrl: 'https://trader.blueguardian.com/metrics/6a44616ab671d2ca83eaeb96',
    status: 'active',           // active | passed | failed | funded
    style: 'blue',
    note: 'namanrajsingh2006@gmail.com NYSE Account',
  },

  {
    id: 'BG-5K-001',
    accountName: 'Blue Guardian $5K',
    propFirm: 'Blue Guardian',
    accountSize: 5000,
    initialBalance: 5000,
    currentBalance: 4921.52,
    targetBalance: 5300,        // phase profit target
    maxDrawdown: 400,           // max allowed drawdown ($)
    phase: 'PHASE 1',
    totalPhases: 3,
    startDate: '2026-06-24',
    accountNumber: '238927',
    dashboardUrl: 'https://trader.blueguardian.com/metrics/6a3aeb1384372ffceb979641',
    status: 'active',           // active | passed | failed | funded
    style: 'blue',
    note: 'namanrajsingh2006@gmail.com OrderFlow Account',
  },

  {
    id: 'BG-5K-003',
    accountName: 'Blue Guardian $5K',
    propFirm: 'Blue Guardian',
    accountSize: 5000,
    initialBalance: 5000,
    currentBalance: 5325.77,
    targetBalance: 5300,        // phase profit target
    maxDrawdown: 400,           // max allowed drawdown ($)
    phase: 'PHASE 1',
    totalPhases: 3,
    startDate: '2026-06-24',
    accountNumber: '238934',
    dashboardUrl: 'https://trader.blueguardian.com/metrics/6a3af5e23dbd89e9dfb84282',
    status: 'active',           // active | passed | failed | funded
    style: 'blue',
    note: 'dr.namanrajsingh@gmail.com',
  }
  // {
  //   id: 'GFT-5K-001',
  //   accountName: 'GFT $5K',
  //   propFirm: 'GFT',
  //   accountSize: 5000,
  //   initialBalance: 5000,
  //   currentBalance: 4783.08,
  //   targetBalance: 5400,
  //   maxDrawdown: 400,
  //   phase: 'PHASE 1',
  //   totalPhases: 2,
  //   startDate: '2026-06-20',
  //   accountNumber: 'D#2266823',
  //   dashboardUrl: 'https://app.goatfundedtrader.com/account/2028417?idx=1',
  //   status: 'active',
  //   style: 'gold',
  //   note: 'trade.namanrajsingh@gmail.com OrderFlow Account',
  // }
];

// ─────────────────────────────────────────
// Style map — controls accent colour per card
// Add new keys here if you create new styles
// ─────────────────────────────────────────
const STYLE_MAP = {
  blue:   { accent: '#3b8bd4', glow: 'rgba(59,139,212,0.15)',  bar: 'linear-gradient(90deg,#3b8bd4,#1a5fa0)' },
  gold:   { accent: '#f7b731', glow: 'rgba(247,183,49,0.15)',  bar: 'linear-gradient(90deg,#f7b731,#d49e27)' },
  green:  { accent: '#00e5a0', glow: 'rgba(0,229,160,0.15)',   bar: 'linear-gradient(90deg,#00e5a0,#00b07a)' },
  purple: { accent: '#a78bfa', glow: 'rgba(167,139,250,0.15)', bar: 'linear-gradient(90deg,#a78bfa,#7c3aed)' },
  red:    { accent: '#ff4757', glow: 'rgba(255,71,87,0.15)',   bar: 'linear-gradient(90deg,#ff4757,#c0392b)' },
};
