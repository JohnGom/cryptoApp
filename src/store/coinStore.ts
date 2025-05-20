import { create } from 'zustand';
import { Coin, Market } from '../core/models';
import { DependencyContainer } from '../core/services/DependencyContainer';
import { CoinRepository } from '../infrastructure/repositories/CoinRepository';
import { MarketRepository } from '../infrastructure/repositories/MarketRepository';

interface CoinState {
  coins: Coin[];
  filteredCoins: Coin[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  sortBy: 'rank' | 'price' | 'name' | 'change';
  sortDirection: 'asc' | 'desc';
  // Market data
  markets: Market[];
  marketsLoading: boolean;
  marketsError: string | null;
  // Actions
  fetchCoins: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  setSortBy: (sortBy: 'rank' | 'price' | 'name' | 'change') => void;
  toggleSortDirection: () => void;
  fetchMarkets: (coinId: string) => Promise<void>;
}

const coinRepository = DependencyContainer.getInstance().resolve<CoinRepository>('coinRepository');
const marketRepository = DependencyContainer.getInstance().resolve<MarketRepository>('marketRepository');

export const useCoinStore = create<CoinState>((set, get) => ({
  coins: [],
  filteredCoins: [],
  isLoading: false,
  error: null,
  searchTerm: '',
  sortBy: 'rank',
  sortDirection: 'asc',
  // Market data initial state
  markets: [],
  marketsLoading: false,
  marketsError: null,

  fetchCoins: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await coinRepository.findAll();
      set({
        coins: response,
        filteredCoins: response,
        isLoading: false,
      });
      // Apply current search and sort
      get().setSearchTerm(get().searchTerm);
    } catch (error) {
      set({
        coins: [],
        filteredCoins: [],
        error: error instanceof Error ? error.message : 'Failed to fetch coins',
        isLoading: false,
      });
    }
  },

  fetchMarkets: async (coinId: string) => {
    set({ marketsLoading: true, marketsError: null });
    try {
      const markets = await marketRepository.findAllForCoin(coinId);
      set({
        markets,
        marketsLoading: false,
      });
    } catch (error) {
      set({
        markets: [],
        marketsError: error instanceof Error ? error.message : 'Failed to fetch markets',
        marketsLoading: false,
      });
    }
  },

  setSearchTerm: (term: string) => {
    const { coins, sortBy, sortDirection } = get();

    // First filter by search term
    const filtered = term
      ? coins.filter(coin =>
          coin.name.toLowerCase().includes(term.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(term.toLowerCase())
        )
      : [...coins];

    // Then apply sorting
    const sorted = sortCoins(filtered, sortBy, sortDirection);

    set({
      searchTerm: term,
      filteredCoins: sorted,
    });
  },

  setSortBy: (sortBy: 'rank' | 'price' | 'name' | 'change') => {
    const { filteredCoins, sortDirection } = get();

    set({
      sortBy,
      filteredCoins: sortCoins(filteredCoins, sortBy, sortDirection),
    });
  },

  toggleSortDirection: () => {
    const { filteredCoins, sortBy, sortDirection } = get();
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';

    set({
      sortDirection: newDirection,
      filteredCoins: sortCoins(filteredCoins, sortBy, newDirection),
    });
  },
}));

// Helper function to sort coins
function sortCoins(
  coins: Coin[],
  sortBy: 'rank' | 'price' | 'name' | 'change',
  sortDirection: 'asc' | 'desc'
): Coin[] {
  const sorted = [...coins];

  sorted.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'rank':
        comparison = a.rank - b.rank;
        break;
      case 'price':
        comparison = parseFloat(a.price_usd) - parseFloat(b.price_usd);
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'change':
        comparison = parseFloat(a.percent_change_24h) - parseFloat(b.percent_change_24h);
        break;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return sorted;
}
