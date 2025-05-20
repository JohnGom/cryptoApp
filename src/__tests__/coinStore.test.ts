import { act } from 'react-test-renderer';
import { useCoinStore } from '../store/coinStore';

// Mock de CoinRepository y MarketRepository
jest.mock('../core/services/DependencyContainer', () => {
  const actual = jest.requireActual('../core/services/DependencyContainer');
  return {
    ...actual,
    DependencyContainer: {
      getInstance: () => ({
        resolve: (repo: string) => {
          if (repo === 'coinRepository') {
            return {
              findAll: jest.fn().mockResolvedValue([
                // Mock de Coin
                {
                  id: 'bitcoin',
                  symbol: 'BTC',
                  name: 'Bitcoin',
                  nameid: 'bitcoin',
                  rank: 1,
                  price_usd: '50000',
                  percent_change_24h: '2.5',
                  percent_change_1h: '0.1',
                  percent_change_7d: '5.0',
                  price_btc: '1',
                  market_cap_usd: '1000000000',
                  volume24: 1000000,
                  volume24a: 900000,
                  csupply: '18000000',
                  tsupply: '21000000',
                  msupply: '21000000',
                },
              ].map((data) => ({
                ...data,
                // Métodos de Coin
                get id() { return data.id; },
                get symbol() { return data.symbol; },
                get name() { return data.name; },
                get rank() { return data.rank; },
                get price_usd() { return data.price_usd; },
                get percent_change_24h() { return data.percent_change_24h; },
                get percent_change_1h() { return data.percent_change_1h; },
                get percent_change_7d() { return data.percent_change_7d; },
                get price_btc() { return data.price_btc; },
                get market_cap_usd() { return data.market_cap_usd; },
                get volume24() { return data.volume24; },
                get volume24a() { return data.volume24a; },
                get csupply() { return data.csupply; },
                get tsupply() { return data.tsupply; },
                get msupply() { return data.msupply; },
              }))),
            };
          }
          if (repo === 'marketRepository') {
            return {
              findAllForCoin: jest.fn().mockResolvedValue([
                // Mock de Market
                {
                  name: 'Binance',
                  base: 'BTC',
                  quote: 'USDT',
                  price: 50000,
                  price_usd: 50000,
                  volume: 1000,
                  volume_usd: 50000000,
                  time: 1620000000,
                  exchange_url: 'https://binance.com',
                  exchange_id: 'binance',
                },
              ])
            };
          }
        },
      }),
    },
  };
});

describe('coinStore', () => {
  beforeEach(() => {
    useCoinStore.setState({
      coins: [],
      filteredCoins: [],
      isLoading: false,
      error: null,
      searchTerm: '',
      sortBy: 'rank',
      sortDirection: 'asc',
      markets: [],
      marketsLoading: false,
      marketsError: null,
    });
  });

  it('debería cargar monedas correctamente', async () => {
    await act(async () => {
      await useCoinStore.getState().fetchCoins();
    });
    const state = useCoinStore.getState();
    expect(state.filteredCoins).toHaveLength(1);
    expect(state.filteredCoins[0].name).toBe('Bitcoin');
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('debería filtrar monedas por nombre', async () => {
    await act(async () => {
      await useCoinStore.getState().fetchCoins();
    });
    useCoinStore.getState().setSearchTerm('bit');
    const state = useCoinStore.getState();
    expect(state.filteredCoins).toHaveLength(1);
    expect(state.filteredCoins[0].name).toBe('Bitcoin');
  });

  it('debería cargar mercados correctamente', async () => {
    await act(async () => {
      await useCoinStore.getState().fetchMarkets('bitcoin');
    });
    const state = useCoinStore.getState();
    expect(state.markets).toHaveLength(1);
    expect(state.markets[0].name).toBe('Binance');
    expect(state.marketsLoading).toBe(false);
    expect(state.marketsError).toBeNull();
  });
});
