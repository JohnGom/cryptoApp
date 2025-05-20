import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CoinSearch from '../components/CoinSearch';
import { useCoinStore } from '../store/coinStore';

jest.mock('../store/coinStore');

const mockSetSearchTerm = jest.fn();
(useCoinStore as jest.Mock).mockReturnValue({
  searchTerm: '',
  setSearchTerm: mockSetSearchTerm,
});

describe('CoinSearch', () => {
  beforeEach(() => {
    mockSetSearchTerm.mockClear();
  });

  it('debería renderizar el input de búsqueda', () => {
    const { getByPlaceholderText } = render(<CoinSearch />);
    expect(getByPlaceholderText('Search coins...')).toBeTruthy();
  });

  it('debería llamar a setSearchTerm al escribir', () => {
    const { getByPlaceholderText } = render(<CoinSearch />);
    const input = getByPlaceholderText('Search coins...');
    fireEvent.changeText(input, 'eth');
    expect(mockSetSearchTerm).toHaveBeenCalledWith('eth');
  });
});
