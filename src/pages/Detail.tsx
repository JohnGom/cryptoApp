import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Coin } from '../api';
import { useCoinStore } from '../store/coinStore';
import MarketItem from '../components/MarketItem';

// Define the param list for the navigator
export type RootStackParamList = {
  Home: undefined;
  Detail: { coin: Coin };
};

// Define props for this screen
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

interface DetailScreenProps {
  route: DetailScreenRouteProp;
}

export default function DetailScreen({ route }: DetailScreenProps) {
  const { coin } = route.params;
  const { markets, marketsLoading, marketsError, fetchMarkets } = useCoinStore();

  useEffect(() => {
    // Fetch markets when component mounts
    fetchMarkets(coin.id);
  }, [coin.id, fetchMarkets]);

  return (
    <View style={styles.container}>
      <View style={styles.coinInfo}>
        <Text style={styles.title}>{coin.name} ({coin.symbol})</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Price</Text>
            <Text style={styles.infoValue}>${parseFloat(coin.price_usd).toFixed(2)}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>BTC Price</Text>
            <Text style={styles.infoValue}>{coin.price_btc}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Market Cap</Text>
            <Text style={styles.infoValue}>${parseInt(coin.market_cap_usd).toLocaleString()}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Volume 24h</Text>
            <Text style={styles.infoValue}>${coin.volume24.toLocaleString()}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Change 24h</Text>
            <Text style={[
              styles.changeValue,
              parseFloat(coin.percent_change_24h) > 0 ? styles.positive : styles.negative
            ]}>{coin.percent_change_24h}%</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Change 1h</Text>
            <Text style={[
              styles.changeValue,
              parseFloat(coin.percent_change_1h) > 0 ? styles.positive : styles.negative
            ]}>{coin.percent_change_1h}%</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.marketsContainer}>
        <Text style={styles.sectionTitle}>Markets</Text>
        
        {marketsLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2196F3" />
          </View>
        ) : marketsError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error: {marketsError}</Text>
            <Text style={styles.retryText} onPress={() => fetchMarkets(coin.id)}>
              Tap to retry
            </Text>
          </View>
        ) : (
          <FlatList
            data={markets}
            renderItem={({ item }) => <MarketItem market={item} />}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No market data available</Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  coinInfo: {
    padding: 20,
    borderBottomWidth: 10,
    borderBottomColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  changeValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  positive: {
    color: '#4CAF50',
  },
  negative: {
    color: '#F44336',
  },
  marketsContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
    marginBottom: 10,
  },
  retryText: {
    fontSize: 16,
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
