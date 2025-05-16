import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import { useCoinStore } from '../store/coinStore';
import CoinItem from './CoinItem';
import CoinSearch from './CoinSearch';

const CoinList: React.FC = () => {
  const {
    filteredCoins,
    fetchCoins,
    isLoading,
    error,
  } = useCoinStore();

  useEffect(() => {
    // Fetch coins when component mounts
    fetchCoins();
  }, [fetchCoins]);

  const handleRefresh = () => {
    fetchCoins();
  };

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Text style={styles.retryText} onPress={fetchCoins}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CoinSearch />
      {isLoading && filteredCoins.length === 0 ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
        </View>
      ) : (
        <FlatList
          data={filteredCoins}
          renderItem={({ item }) => <CoinItem coin={item} />}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={handleRefresh}
              colors={['#2196F3']}
            />
          }
          ListEmptyComponent={
            <View style={styles.centerContainer}>
              <Text style={styles.emptyText}>No coins found</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerContainer: {
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
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default CoinList;
