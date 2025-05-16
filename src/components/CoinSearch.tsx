import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useCoinStore } from '../store/coinStore';

interface SortOption {
  label: string;
  value: 'rank' | 'price' | 'name' | 'change';
}

const sortOptions: SortOption[] = [
  { label: 'Rank', value: 'rank' },
  { label: 'Price', value: 'price' },
  { label: 'Name', value: 'name' },
  { label: 'Change', value: 'change' },
];

const CoinSearch: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    sortBy,
    sortDirection,
    setSortBy,
    toggleSortDirection,
  } = useCoinStore();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search coins..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        autoCapitalize="none"
      />
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <View style={styles.sortOptionsContainer}>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.sortOption,
                sortBy === option.value && styles.activeSortOption,
              ]}
              onPress={() => setSortBy(option.value)}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  sortBy === option.value && styles.activeSortOptionText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.sortDirectionButton}
          onPress={toggleSortDirection}
        >
          <Text style={styles.sortDirectionText}>
            {sortDirection === 'asc' ? '↑' : '↓'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  sortOptionsContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  sortOption: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  activeSortOption: {
    backgroundColor: '#2196F3',
  },
  sortOptionText: {
    fontSize: 12,
    color: '#333',
  },
  activeSortOptionText: {
    color: 'white',
  },
  sortDirectionButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortDirectionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CoinSearch;
