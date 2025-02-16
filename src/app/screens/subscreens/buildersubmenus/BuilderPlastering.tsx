import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useFavorites } from '../../../../hooks/FavoritesContext';
import Fontisto from '@expo/vector-icons/Fontisto';
import FaveStyle from '../../../../styles/menus/FaveButton';

const PlasteringScreen = () => {
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  // Check if the screen is a favorite
  const isFavorite = favorites.includes('BuilderPlastering');

  // Toggle favorite functionality
  const handleFavoritePress = () => {
    if (isFavorite) {
      removeFavorite('BuilderPlastering');
    } else {
      addFavorite('BuilderPlastering');
    }
  };

  return (
    <View style={FaveStyle.container}>
      <TouchableOpacity
        style={[FaveStyle.addButton, isFavorite && FaveStyle.favoriteButtonActive]}
        onPress={handleFavoritePress}
      >
        <Fontisto 
              name={isFavorite ? "favorite" : "favorite"} 
              size={28} 
              color={isFavorite ? "#FF3B30" : "#323232"} 
            />
      </TouchableOpacity>
    </View>
  );
};

// Styles for the screen
const styles = StyleSheet.create({

});
export default PlasteringScreen;
