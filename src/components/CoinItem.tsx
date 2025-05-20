import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Coin } from '../core/models/Coin';
import CoinIcons from '../assets/coinIcons.json';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../pages/Detail';

interface CoinItemProps {
  coin: Coin;
}

const CoinItem: React.FC<CoinItemProps> = ({ coin }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // Default image URL in case the coin symbol is not found in CoinIcons
  const defaultImage = 'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg';

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', {coin})} style={styles.container}>
      <View style={styles.leftContainer}>
        <Image
          source={{ uri: (CoinIcons as Record<string, string>)[coin.symbol] || defaultImage }}
          style={styles.image}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{coin.name}</Text>
          <Text style={styles.symbol}>{coin.symbol}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.price}>${parseFloat(coin.price_usd).toFixed(2)}</Text>
        <Text style={[
          styles.change,
          parseFloat(coin.percent_change_24h) > 0 ? styles.positiveChange : styles.negativeChange,
        ]}>
          {coin.percent_change_24h}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 35,
    height: 35,
    marginEnd: 10,
  },
  nameContainer: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  symbol: {
    fontSize: 14,
    color: '#666',
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
  },
  change: {
    fontSize: 14,
  },
  positiveChange: {
    color: '#4CAF50',
  },
  negativeChange: {
    color: '#F44336',
  },
});

export default CoinItem;
