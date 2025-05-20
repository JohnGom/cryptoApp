import { IRepository } from '../../core/interfaces/IRepository';
import { Coin } from '../../core/models/Coin';
import { IAPIService } from '../../core/interfaces/IAPIService';

/**
 * Repository for Coin entities
 * Handles data access operations related to cryptocurrencies
 */
export class CoinRepository implements IRepository<Coin, string> {
  private apiService: IAPIService;

  /**
   * Creates a new CoinRepository instance
   * @param apiService - API service implementation to use
   */
  constructor(apiService: IAPIService) {
    this.apiService = apiService;
  }

  /**
   * Find all coins
   * @param start - Start index (optional)
   * @param limit - Number of coins to fetch (optional)
   */
  async findAll(start = 0, limit = 100): Promise<Coin[]> {
    const response = await this.apiService.getTickers(start, limit);
    // Map API response to Coin domain objects
    return response.data.map(coinData => Coin.fromApiResponse(coinData));
  }

  /**
   * Find coin by ID
   * @param id - Coin ID
   */
  async findById(id: string): Promise<Coin | null> {
    try {
      const coinData = await this.apiService.getCoin(id);
      if (coinData && coinData.length > 0) {
        return Coin.fromApiResponse(coinData[0]);
      }
      return null;
    } catch (error) {
      console.error(`Error fetching coin with ID ${id}:`, error);
      return null;
    }
  }

  async findByCriteria(criteria: Partial<Coin>): Promise<Coin[]> {
    // Get all coins and filter them in memory
    // In a production app, you might want to implement server-side filtering if available
    const allCoins = await this.findAll(0, 100);
    return allCoins.filter(coin => {
      // Match all non-undefined criteria
      return Object.entries(criteria).every(([key, value]) => {
        if (value === undefined) return true;
        // @ts-ignore: Dynamic property access
        const coinValue = coin[key];
        // Handle special case for string search (partial match)
        if (typeof value === 'string' && typeof coinValue === 'string') {
          return coinValue.toLowerCase().includes(value.toLowerCase());
        }
        // Exact match for other types
        return coinValue === value;
      });
    });
  }

  /**
   * Find coins by name or symbol (case-insensitive)
   * @param searchTerm - Search term
   */
  async searchByNameOrSymbol(searchTerm: string): Promise<Coin[]> {
    const allCoins = await this.findAll(0, 100);
    const lowercaseTerm = searchTerm.toLowerCase();

    return allCoins.filter(coin => 
      coin.name.toLowerCase().includes(lowercaseTerm) || 
      coin.symbol.toLowerCase().includes(lowercaseTerm)
    );
  }

  /**
   * Sort coins by a specific property
   * @param coins - Coins to sort
   * @param property - Property to sort by
   * @param direction - Sort direction (asc or desc)
   */
  sortCoins(
    coins: Coin[],
    property: 'rank' | 'price_usd' | 'name' | 'percent_change_24h',
    direction: 'asc' | 'desc'
  ): Coin[] {
    const sorted = [...coins];

    sorted.sort((a, b) => {
      let result = 0;

      switch (property) {
        case 'rank':
          result = a.rank - b.rank;
          break;
        case 'price_usd':
          result = a.getPriceAsNumber() - b.getPriceAsNumber();
          break;
        case 'name':
          result = a.name.localeCompare(b.name);
          break;
        case 'percent_change_24h':
          result = a.getChange24hAsNumber() - b.getChange24hAsNumber();
          break;
      }

      return direction === 'asc' ? result : -result;
    });

    return sorted;
  }
}
