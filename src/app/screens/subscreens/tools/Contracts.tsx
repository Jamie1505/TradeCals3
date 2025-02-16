import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useFavorites } from '../../../../hooks/FavoritesContext';
import Fontisto from '@expo/vector-icons/Fontisto';
import FaveStyle from '../../../../styles/menus/FaveButton';
const ContractScreen= () => {
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  // Check if the screen is a favorite
  const isFavorite = favorites.includes('ArchitectLighting');

  // Toggle favorite functionality
  const handleFavoritePress = () => {
    if (isFavorite) {
      removeFavorite('ArchitectLighting');
    } else {
      addFavorite('ArchitectLighting');
    }
  };

  return (
    <View style={FaveStyle.container}>
        <Text> Contract Screen</Text>
      <TouchableOpacity
        style={[FaveStyle.addButton, isFavorite && FaveStyle.favoriteButtonActive]}
        onPress={handleFavoritePress}
      >
        <Fontisto 
          name={isFavorite ? "heart" : "heart-alt"} 
          size={24} 
          color="white" 
        />
      </TouchableOpacity>
    </View>
  );
};

export default ContractScreen;