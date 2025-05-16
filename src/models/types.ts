// Coinlore API response interfaces

// Global crypto stats
export interface GlobalData {
  coins_count: number;
  active_markets: number;
  total_mcap: number;
  total_volume: number;
  btc_d: string;
  eth_d: string;
  mcap_change: string;
  volume_change: string;
  avg_change_percent: string;
  volume_ath: number;
  mcap_ath: number;
}

// Coin (ticker) data
export interface Coin {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  volume24a: number;
  csupply: string;
  tsupply: string;
  msupply: string;
}

// Ticker data with info
export interface TickerResponse {
  data: Coin[];
  info: {
    coins_num: number;
    time: number;
  };
}

// Market data
export interface Market {
  name: string;
  base: string;
  quote: string;
  price: number;
  price_usd: number;
  volume: number;
  volume_usd: number;
  time: number;
  exchange_url?: string;  // URL of the exchange
  exchange_id?: string;   // ID of the exchange
}

// Exchange data
export interface Exchange {
  id: string;
  name: string;
  name_id: string;
  volume_usd: number;
  active_pairs: number;
  url: string;
  country: string;
}

// Exchange detail
export interface ExchangeDetail {
  name: string;
  date_live: string;
  url: string;
  pairs: {
    base: string;
    quote: string;
    volume: number;
    price: number;
    price_usd: number;
    time: number;
  }[];
}

// Social stats
export interface SocialStats {
  reddit: {
    avg_active_users: number;
    subscribers: number;
  };
  twitter: {
    followers_count: number;
    status_count: number;
  };
}
