import {
  GlobalData,
  Coin,
  TickerResponse,
  Market,
  Exchange,
  ExchangeDetail,
  SocialStats,
} from '../models/types';

const API_BASE_URL = 'https://api.coinlore.net/api';

/**
 * Service class for Coinlore cryptocurrency API
 */
class CoinloreAPI {
  // Cache for exchanges data to avoid multiple requests
  private exchangesCache: Record<string, Exchange> | null = null;

  /**
   * Get global cryptocurrency market data
   */
  async getGlobalData(): Promise<GlobalData[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/global/`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching global data:', error);
      throw error;
    }
  }

  /**
   * Get cryptocurrency tickers (paginated)
   * @param start - Start index (default: 0)
   * @param limit - Number of results (default: 100, max: 100)
   */
  async getTickers(start = 0, limit = 100): Promise<TickerResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/tickers/?start=${start}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching tickers:', error);
      throw error;
    }
  }

  /**
   * Get specific coin by ID
   * @param id - Coin ID
   */
  async getCoin(id: string): Promise<Coin[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/ticker/?id=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching coin with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get multiple coins by IDs
   * @param ids - Array of coin IDs
   */
  async getMultipleCoins(ids: string[]): Promise<Coin[]> {
    try {
      const idsString = ids.join(',');
      const response = await fetch(`${API_BASE_URL}/ticker/?id=${idsString}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching multiple coins:', error);
      throw error;
    }
  }

  /**
   * Get all exchanges
   */
  async getExchanges(): Promise<Record<string, Exchange>> {
    try {
      // If we already have the exchanges in cache, return them
      if (this.exchangesCache) {
        return this.exchangesCache;
      }

      const response = await fetch(`${API_BASE_URL}/exchanges/`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const exchanges = await response.json();

      // Cache the exchanges
      this.exchangesCache = exchanges;

      return exchanges;
    } catch (error) {
      console.error('Error fetching exchanges:', error);
      throw error;
    }
  }

  /**
   * Get markets for a specific coin and enrich with exchange URLs
   * @param id - Coin ID
   */
  async getCoinMarkets(id: string): Promise<Market[]> {
    try {
      // Fetch markets for the coin
      const marketsResponse = await fetch(`${API_BASE_URL}/coin/markets/?id=${id}`);
      if (!marketsResponse.ok) {
        throw new Error(`HTTP error! Status: ${marketsResponse.status}`);
      }
      const markets: Market[] = await marketsResponse.json();

      // Fetch exchanges to get URLs
      const exchanges = await this.getExchanges();
      // Enrich markets with exchange URLs
      const enrichedMarkets = markets.map(market => {
        // Find exchange by name (case-insensitive comparison)
        const exchangeEntry = Object.entries(exchanges).find(([_, exchange]) =>
          exchange.name.toLowerCase() === market.name.toLowerCase()
        );

        if (exchangeEntry) {
          const [exchangeId, exchange] = exchangeEntry;
          return {
            ...market,
            exchange_url: exchange.url,
            exchange_id: exchangeId,
          };
        }

        return market;
      });

      return enrichedMarkets;
    } catch (error) {
      console.error(`Error fetching markets for coin ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get specific exchange by ID
   * @param id - Exchange ID
   */
  async getExchange(id: string): Promise<ExchangeDetail> {
    try {
      const response = await fetch(`${API_BASE_URL}/exchange/?id=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching exchange with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get social stats for a specific coin
   * @param id - Coin ID
   */
  async getSocialStats(id: string): Promise<SocialStats> {
    try {
      const response = await fetch(`${API_BASE_URL}/coin/social_stats/?id=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching social stats for coin ID ${id}:`, error);
      throw error;
    }
  }
}

// Export as singleton instance
export const coinloreAPI = new CoinloreAPI();

// Also export the class for testing purposes
export default CoinloreAPI;
