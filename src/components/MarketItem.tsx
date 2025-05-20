import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { Market } from '../core/models';

interface MarketItemProps {
  market: Market;
}

const MarketItem: React.FC<MarketItemProps> = ({ market }) => {
  const handleExchangePress = async () => {
    if (market.hasExchangeUrl()) {
      // Get URL with correct prefix
      const exchangeUrl = market.exchange_url || '';
      const url = exchangeUrl.startsWith('http')
        ? exchangeUrl
        : `https://${exchangeUrl}`;

      try {
        // Check if the URL can be opened
        const canOpen = await Linking.canOpenURL(url);

        if (canOpen) {
          await Linking.openURL(url);
        } else {
          Alert.alert('Error', `Cannot open URL: ${url}`);
        }
      } catch (error) {
        console.error('Error opening URL:', error);
        Alert.alert('Error', 'Failed to open the exchange website');
      }
    } else {
      Alert.alert('No URL', 'No exchange URL available');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftPart}>
        {market.hasExchangeUrl() ? (
          <TouchableOpacity onPress={handleExchangePress}>
            <Text style={[styles.exchangeName, styles.linkText]}>{market.name}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.exchangeName}>{market.name}</Text>
        )}
        <Text style={styles.pair}>{market.tradingPair}</Text>
      </View>
      <View style={styles.rightPart}>
        <Text style={styles.price}>{market.getFormattedPrice()}</Text>
        <Text style={styles.volume}>Vol: {market.getFormattedVolume()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leftPart: {
    flex: 1,
    justifyContent: 'center',
  },
  rightPart: {
    alignItems: 'flex-end',
  },
  exchangeName: {
    fontSize: 16,
    fontWeight: '500',
  },
  linkText: {
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
  pair: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
  },
  volume: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

export default MarketItem;
