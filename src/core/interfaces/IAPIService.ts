import { Coin, Market, Exchange } from '../models';

/**
 * Base API Service interface
 * Defines the contract for all API service implementations
 */
export interface IAPIService {

  /**
   * Get cryptocurrency tickers (paginated)
   * @param start - Start index
   * @param limit - Number of results
   */
  getTickers(start?: number, limit?: number): Promise<{ data: Coin[], info: { coins_num: number, time: number } }>;

  /**
   * Get specific coin by ID
   * @param id - Coin ID
   */
  getCoin(id: string): Promise<Coin[]>;

  /**
   * Get multiple coins by IDs
   * @param ids - Array of coin IDs
   */
  getMultipleCoins(ids: string[]): Promise<Coin[]>;

  /**
   * Get markets for a specific coin
   * @param id - Coin ID
   */
  getCoinMarkets(id: string): Promise<Market[]>;

  /**
   * Get all exchanges
   */
  getExchanges(): Promise<Record<string, Exchange>>;

}
