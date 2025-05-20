import { IRepository } from '../../core/interfaces/IRepository';
import { Market } from '../../core/models';
import { IAPIService } from '../../core/interfaces/IAPIService';

/**
 * Repository for Market entities
 * Handles data access operations related to cryptocurrency markets
 */
export class MarketRepository implements IRepository<Market, string> {
  private apiService: IAPIService;

  /**
   * Creates a new MarketRepository instance
   * @param apiService - API service implementation to use
   */
  constructor(apiService: IAPIService) {
    this.apiService = apiService;
  }

  /**
   * Find all markets for a specific coin
   * @param coinId - ID of the coin
   */
  async findAllForCoin(coinId: string): Promise<Market[]> {
    const marketsData = await this.apiService.getCoinMarkets(coinId);

    // Map API response to Market domain objects
    const market =  marketsData.map(marketData => Market.fromApiResponse(marketData));
    return market;
  }

  /**
   * Find all markets (not implemented directly in this API)
   * Would need to fetch markets for all coins
   */
  async findAll(): Promise<Market[]> {
    // This API doesn't provide a direct endpoint to get all markets
    // A real implementation would need to aggregate markets for all coins
    // or use a different endpoint if available
    return [];
  }

  /**
   * Find market by ID (not implemented for this API)
   * @param id - Market ID
   */
  async findById(_id: string): Promise<Market | null> {
    // This API doesn't provide a direct way to get a market by ID
    return null;
  }

  /**
   * Find markets by search criteria
   * Since we can't search directly in the API, we load markets for a coin and filter them
   * @param criteria - Search criteria
   * @param coinId - ID of the coin to load markets for
   */
  async findByCriteria(criteria: Partial<Market>, coinId?: string): Promise<Market[]> {
    if (!coinId) return [];

    const markets = await this.findAllForCoin(coinId);

    return markets.filter(market => {
      // Match all non-undefined criteria
      return Object.entries(criteria).every(([key, value]) => {
        if (value === undefined) return true;

        // @ts-ignore: Dynamic property access
        const marketValue = market[key];

        // Handle special case for string search (partial match)
        if (typeof value === 'string' && typeof marketValue === 'string') {
          return marketValue.toLowerCase().includes(value.toLowerCase());
        }

        // Exact match for other types
        return marketValue === value;
      });
    });
  }

  /**
   * Sort markets by volume (DESC)
   * @param markets - Markets to sort
   */
  sortMarketsByVolume(markets: Market[]): Market[] {
    return [...markets].sort((a, b) => b.volume_usd - a.volume_usd);
  }

  /**
   * Find markets with URLs
   * @param markets - Markets to filter
   */
  filterMarketsWithUrls(markets: Market[]): Market[] {
    return markets.filter(market => market.hasExchangeUrl());
  }
}
